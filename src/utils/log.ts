import {red, yellow, gray, black, magenta, bgYellow, bgRed} from '../utils/terminal.js';
import {EMPTY_ARRAY, toArray} from './array.js';
import {toEnvNumber} from './env.js';

// TODO could use some refactoring

// TODO track warnings/errors (or anything above a certain threshold)
// and report at the end of each build (and other tasks)

export enum LogLevel {
	Off = 0,
	Error = 1,
	Warn = 2,
	Info = 3,
	Trace = 4,
}

export const ENV_LOG_LEVEL = toEnvNumber('GRO_LOG_LEVEL');
export const DEFAULT_LOG_LEVEL = ENV_LOG_LEVEL ?? LogLevel.Trace;

/*

`Logger` uses a special pattern
to achieve a good mix of convenience and flexibility
both for Felt and user code.
It uses late binding to allow runtime mutations
and it accepts a `LoggerState` argument for custom behavior.
Though the code is more verbose and slower as a result,
the tradeoffs make sense for logging in development.
TODO use a different logger in production

The default `LoggerState` is the `Logger` class itself.
This pattern allows us to have globally mutable logger state
without locking the code into the singleton pattern.
Properties like the static `Logger.level` can be mutated
to affect all loggers that get instantiated with the default state,
but loggers can also be instantiated with other state
that isn't affected by these globally mutable values.

Custom loggers like `SystemLogger` (see below)
demonstrate extending `Logger` to partition logging concerns.
User code is given a lot of control and flexibility.

This design opens the potential for hard-to-track bugs -
globally mutable properties bad!! -
but it also provides flexibility that feels appropriate for logging.
This probably isn't a good pattern to use in, for example,
the data management layer.

Logging in and around tests is a motivating use case for this design.
See the usage of `TestLogger` in the test framework code for more.
Scratch that: that code is gone now after we replaced Felt's `oki` with `uvu`.
How should we integrate the test logger with `uvu`? 
TODO !

*/

export type Log = (...args: any[]) => void;

export interface LoggerState {
	level: LogLevel;
	log: Log;
	error: LogLevelDefaults;
	warn: LogLevelDefaults;
	info: LogLevelDefaults;
	trace: LogLevelDefaults;
}

interface LogLevelDefaults {
	prefixes: any[];
	suffixes: any[];
}

export class DevLogger {
	readonly prefixes: readonly any[];
	readonly suffixes: readonly any[];
	readonly state: LoggerState; // can be the implementing class constructor

	constructor(
		prefixes: readonly any[] | unknown,
		suffixes: readonly any[] | unknown,
		state: LoggerState,
	) {
		this.prefixes = toArray(prefixes);
		this.suffixes = toArray(suffixes);
		this.state = state;
	}

	error(...args: any[]): void {
		if (this.state.level < LogLevel.Error) return;
		this.state.log(
			...this.state.error.prefixes,
			...this.prefixes,
			...args,
			...this.suffixes,
			...this.state.error.suffixes,
		);
	}

	warn(...args: any[]): void {
		if (this.state.level < LogLevel.Warn) return;
		this.state.log(
			...this.state.warn.prefixes,
			...this.prefixes,
			...args,
			...this.suffixes,
			...this.state.warn.suffixes,
		);
	}

	info(...args: any[]): void {
		if (this.state.level < LogLevel.Info) return;
		this.state.log(
			...this.state.info.prefixes,
			...this.prefixes,
			...args,
			...this.suffixes,
			...this.state.info.suffixes,
		);
	}

	trace(...args: any[]): void {
		if (this.state.level < LogLevel.Trace) return;
		this.state.log(
			...this.state.trace.prefixes,
			...this.prefixes,
			...args,
			...this.suffixes,
			...this.state.trace.suffixes,
		);
	}

	plain(...args: any[]): void {
		this.state.log(...args);
	}

	newline(): void {
		this.state.log('\n');
	}
}

export class Logger extends DevLogger {
	constructor(
		prefixes: readonly any[] | unknown = EMPTY_ARRAY,
		suffixes: readonly any[] | unknown = EMPTY_ARRAY,
		state: LoggerState = Logger,
	) {
		super(prefixes, suffixes, state);
	}

	// These properties can be mutated at runtime (see `configureLogLevel`)
	// to affect all loggers instantiated with the default `state`.
	// See the comment on `LoggerState` for more.
	static level: LogLevel = DEFAULT_LOG_LEVEL;
	static log: Log = console.log.bind(console);
	static error: LogLevelDefaults = {
		prefixes: [red('➤'), black(bgRed(' 🞩 error 🞩 ')), red('\n➤')],
		suffixes: ['\n ', black(bgRed(' 🞩🞩 '))],
	};
	static warn: LogLevelDefaults = {
		prefixes: [yellow('➤'), black(bgYellow(' ⚑ warning ⚑ ')), '\n' + yellow('➤')],
		suffixes: ['\n ', black(bgYellow(' ⚑ '))],
	};
	static info: LogLevelDefaults = {
		prefixes: [gray('➤')],
		suffixes: [],
	};
	static trace: LogLevelDefaults = {
		prefixes: [gray('—')],
		suffixes: [],
	};
}

/*

The `SystemLogger` is distinct from the `Logger`
to cleanly separate Felt's logging from user logging, decoupling their log levels.
Felt internally uses `SystemLogger`, not `Logger` directly.
This allows user code to simply import and use `Logger`.
`SystemLogger` is still made available to user code,
and users can always extend `Logger` with their own custom versions.

*/
export class SystemLogger extends DevLogger {
	constructor(
		prefixes: readonly any[] | unknown = EMPTY_ARRAY,
		suffixes: readonly any[] | unknown = EMPTY_ARRAY,
		state: LoggerState = SystemLogger,
	) {
		super(prefixes, suffixes, state);
	}

	// These properties can be mutated at runtime (see `configureLogLevel`)
	// to affect all loggers instantiated with the default `state`.
	// See the comment on `LoggerState` for more.
	static level: LogLevel = DEFAULT_LOG_LEVEL;
	static log: Log = console.log.bind(console);
	static error: LogLevelDefaults = {
		prefixes: [red('➤'), black(bgRed(' 🞩 error 🞩 ')), red('\n➤')],
		suffixes: ['\n ', black(bgRed(' 🞩🞩 '))],
	};
	static warn: LogLevelDefaults = {
		prefixes: [yellow('➤'), black(bgYellow(' ⚑ warning ⚑ ')), '\n' + yellow('➤')],
		suffixes: ['\n ', black(bgYellow(' ⚑ '))],
	};
	static info: LogLevelDefaults = {
		prefixes: [gray('➤')],
		suffixes: [],
	};
	static trace: LogLevelDefaults = {
		prefixes: [gray('—')],
		suffixes: [],
	};
}

export const configureLogLevel = (
	level: LogLevel,
	configureMainLogger = true,
	configureSystemLogger = true,
): void => {
	if (configureMainLogger) {
		Logger.level = level;
	}
	if (configureSystemLogger) {
		SystemLogger.level = level;
	}
};

export const printLogLabel = (label: string, color = magenta): string =>
	`${gray('[')}${color(label)}${gray(']')}`;
