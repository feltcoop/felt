import {spawn as spawn_child_process} from 'child_process';
import type {SpawnOptions, ChildProcess} from 'child_process';

import {gray, green, red} from './terminal.js';
import {print_log_label, System_Logger} from './log.js';
import {print_error, print_key_value} from './print.js';
import {wait} from './async.js';
import type {Result} from './types.js';

const log = new System_Logger(print_log_label('process'));

export interface Spawned_Process {
	child: ChildProcess;
	closed: Promise<Spawn_Result>;
}

// TODO are `code` and `signal` more related than that?
// e.g. should this be a union type where one is always `null`?
export type Spawn_Result = Result<
	{signal: NodeJS.Signals | null},
	{signal: NodeJS.Signals | null; code: number | null}
>;

export const print_child_process = (child: ChildProcess): string =>
	`${gray('pid(')}${child.pid}${gray(')')} ← ${green(child.spawnargs.join(' '))}`;

// We register spawned processes gloabally so we can gracefully exit child processes.
// Otherwise, errors can cause zombie processes, sometimes blocking ports even!
export const global_spawn: Set<ChildProcess> = new Set();

// Returns a function that unregisters the `child`.
export const register_global_spawn = (child: ChildProcess): (() => void) => {
	if (global_spawn.has(child)) {
		log.error(red('already registered global spawn:'), print_child_process(child));
	}
	global_spawn.add(child);
	return () => {
		if (!global_spawn.has(child)) {
			log.error(red('spawn not registered:'), print_child_process(child));
		}
		global_spawn.delete(child);
	};
};

export const despawn = (child: ChildProcess): Promise<Spawn_Result> => {
	let resolve: (v: Spawn_Result) => void;
	const closed = new Promise<Spawn_Result>((r) => (resolve = r));
	log.trace('despawning', print_child_process(child));
	child.once('close', (code, signal) => {
		resolve(code ? {ok: false, code, signal} : {ok: true, signal});
	});
	child.kill();
	return closed;
};

export const attach_process_error_handlers = (to_error_label?: To_Error_Label): void => {
	process
		.on('uncaughtException', handle_fatal_error)
		.on('unhandledRejection', handle_unhandled_rejection(to_error_label));
};

const handle_fatal_error = async (err: Error, label = 'handle_fatal_error'): Promise<void> => {
	new System_Logger(print_log_label(label, red)).error(print_error(err));
	await Promise.all(Array.from(global_spawn).map((child) => despawn(child)));
	process.exit(1);
};

const handle_unhandled_rejection = (to_error_label?: To_Error_Label) => (
	err: Error | any,
): Promise<void> => {
	const label = (to_error_label && to_error_label(err)) || 'unhandledRejection';
	return err instanceof Error
		? handle_fatal_error(err, label)
		: handle_fatal_error(new Error(err), label);
};

interface To_Error_Label {
	(err: Error | any): string | null;
}

// Wraps the normal Node `child_process.spawn` with graceful child shutdown behavior.
// Also returns a convenient `closed` promise.
// If you only need `closed`, prefer the shorthand function `spawn_process`.
export const spawn = (
	command: string,
	args: readonly string[] = [],
	options?: SpawnOptions,
): Spawned_Process => {
	let resolve: (v: Spawn_Result) => void;
	const closed = new Promise<Spawn_Result>((r) => (resolve = r));
	const child = spawn_child_process(command, args, {stdio: 'inherit', ...options});
	const unregister = register_global_spawn(child);
	child.once('close', (code, signal) => {
		unregister();
		resolve(code ? {ok: false, code, signal} : {ok: true, signal});
	});
	return {closed, child};
};

// This is just a convenient promise wrapper around `child_process.spawn`
// that's intended for commands that have an end, not long running-processes.
// Any more advanced usage should use `spawn` directly to have access to the `child`.
export const spawn_process = (...args: Parameters<typeof spawn>): Promise<Spawn_Result> =>
	spawn(...args).closed;

export const print_spawn_result = (result: Spawn_Result): string => {
	if (result.ok) return 'ok';
	let text = result.code === null ? '' : print_key_value('code', result.code);
	if (result.signal !== null) text += (text ? ' ' : '') + print_key_value('signal', result.signal);
	return text;
};

// TODO might want to expand this API for some use cases - assumes always running
export interface Restartable_Process {
	restart: () => void;
}

const DEFAULT_RESTART_DELAY = 5; // milliseconds

// This handles many concurrent `restart` calls gracefully,
// and restarts ones after the trailing call, waiting some `delay` in between.
// It's slightly more complex because `kill` is sync, so we tie things up with promises.
export const create_restartable_process = (
	command: string,
	args: readonly string[] = [],
	options?: SpawnOptions,
	delay = DEFAULT_RESTART_DELAY, // milliseconds to wait after killing a process before restarting
): Restartable_Process => {
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
		child = spawn_child_process(command, args, {stdio: 'inherit', ...options});
		const unregister = register_global_spawn(child);
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
