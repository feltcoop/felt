import {spawn as spawnChildProcess} from 'child_process';
import type {SpawnOptions, ChildProcess} from 'child_process';

import {gray, green, red} from '../utils/terminal.js';
import {printLogLabel, SystemLogger} from './log.js';
import {printError, printKeyValue} from './print.js';
import {wait} from './async.js';
import type {Result} from './types.js';

const log = new SystemLogger(printLogLabel('process'));

export interface SpawnedProcess {
	child: ChildProcess;
	closed: Promise<SpawnResult>;
}

// TODO are `code` and `signal` more related than that?
// e.g. should this be a union type where one is always `null`?
export type SpawnResult = Result<
	{signal: NodeJS.Signals | null},
	{signal: NodeJS.Signals | null; code: number | null}
>;

export const printChildProcess = (child: ChildProcess): string =>
	`${gray('pid(')}${child.pid}${gray(')')} ← ${green(child.spawnargs.join(' '))}`;

// We register spawned processes gloabally so we can gracefully exit child processes.
// Otherwise, errors can cause zombie processes, sometimes blocking ports even!
export const globalSpawn: Set<ChildProcess> = new Set();

// Returns a function that unregisters the `child`.
export const registerGlobalSpawn = (child: ChildProcess): (() => void) => {
	if (globalSpawn.has(child)) {
		log.error(red('already registered global spawn:'), printChildProcess(child));
	}
	globalSpawn.add(child);
	return () => {
		if (!globalSpawn.has(child)) {
			log.error(red('spawn not registered:'), printChildProcess(child));
		}
		globalSpawn.delete(child);
	};
};

export const despawn = (child: ChildProcess): Promise<SpawnResult> => {
	let resolve: (v: SpawnResult) => void;
	const closed = new Promise<SpawnResult>((r) => (resolve = r));
	log.trace('despawning', printChildProcess(child));
	child.once('close', (code, signal) => {
		resolve(code ? {ok: false, code, signal} : {ok: true, signal});
	});
	child.kill();
	return closed;
};

export const attachProcessErrorHandlers = (toErrorLabel?: ToErrorLabel): void => {
	process
		.on('uncaughtException', handleFatalError)
		.on('unhandledRejection', handleUnhandledRejection(toErrorLabel));
};

const handleFatalError = async (err: Error, label = 'handleFatalError'): Promise<void> => {
	new SystemLogger(printLogLabel(label, red)).error(printError(err));
	await Promise.all(Array.from(globalSpawn).map((child) => despawn(child)));
	process.exit(1);
};

const handleUnhandledRejection = (toErrorLabel?: ToErrorLabel) => (
	err: Error | any,
): Promise<void> => {
	const label = (toErrorLabel && toErrorLabel(err)) || 'unhandledRejection';
	return err instanceof Error
		? handleFatalError(err, label)
		: handleFatalError(new Error(err), label);
};

interface ToErrorLabel {
	(err: Error | any): string | null;
}

// Wraps the normal Node `child_process.spawn` with graceful child shutdown behavior.
// Also returns a convenient `closed` promise.
// If you only need `closed`, prefer the shorthand function `spawnProcess`.
export const spawn = (
	command: string,
	args: readonly string[] = [],
	options?: SpawnOptions,
): SpawnedProcess => {
	let resolve: (v: SpawnResult) => void;
	const closed = new Promise<SpawnResult>((r) => (resolve = r));
	const child = spawnChildProcess(command, args, {stdio: 'inherit', ...options});
	const unregister = registerGlobalSpawn(child);
	child.once('close', (code, signal) => {
		unregister();
		resolve(code ? {ok: false, code, signal} : {ok: true, signal});
	});
	return {closed, child};
};

// This is just a convenient promise wrapper around `child_process.spawn`
// that's intended for commands that have an end, not long running-processes.
// Any more advanced usage should use `spawn` directly to have access to the `child`.
export const spawnProcess = (...args: Parameters<typeof spawn>): Promise<SpawnResult> =>
	spawn(...args).closed;

export const printSpawnResult = (result: SpawnResult): string => {
	if (result.ok) return 'ok';
	let text = result.code === null ? '' : printKeyValue('code', result.code);
	if (result.signal !== null) text += (text ? ' ' : '') + printKeyValue('signal', result.signal);
	return text;
};

// TODO might want to expand this API for some use cases - assumes always running
export interface RestartableProcess {
	restart: () => void;
}

const DEFAULT_RESTART_DELAY = 5; // milliseconds

// This handles many concurrent `restart` calls gracefully,
// and restarts ones after the trailing call, waiting some `delay` in between.
// It's slightly more complex because `kill` is sync, so we tie things up with promises.
export const createRestartableProcess = (
	command: string,
	args: readonly string[] = [],
	options?: SpawnOptions,
	delay = DEFAULT_RESTART_DELAY, // milliseconds to wait after killing a process before restarting
): RestartableProcess => {
	let child: ChildProcess | null = null;
	let restarting: Promise<void> | null = null;
	let restarted: (() => void) | null = null;
	let queuedRestart = false; // do we have a queued trailing restart?
	const restart = async (): Promise<void> => {
		if (restarting) {
			queuedRestart = true;
			return restarting;
		}
		if (child) {
			restarting = new Promise<void>((resolve) => (restarted = resolve)).then(() => wait(delay));
			child.kill();
			child = null;
			await restarting;
		}
		child = spawnChildProcess(command, args, {stdio: 'inherit', ...options});
		const unregister = registerGlobalSpawn(child);
		child.once('close', () => {
			unregister();
			restarting = null;
			if (restarted) restarted();
		});
		if (queuedRestart) {
			queuedRestart = false;
			await restart();
		}
	};
	restart(); // start on init
	return {restart};
};
