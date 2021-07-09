import {red, yellow, gray, black, magenta, yellow_bg, red_bg} from '$lib/util/terminal.js';
import {EMPTY_ARRAY, to_array} from '$lib/util/array.js';
import {to_env_number} from '$lib/util/env.js';

// TODO could use some refactoring

// TODO track warnings/errors (or anything above a certain threshold)
// and report at the end of each build (and other tasks)

export enum Log_Level {
	Off = 0,
	Error = 1,
	Warn = 2,
	Info = 3,
	Trace = 4,
}

export const ENV_LOG_LEVEL = to_env_number('GRO_LOG_LEVEL');
export const DEFAULT_LOG_LEVEL = ENV_LOG_LEVEL ?? Log_Level.Trace;

/*

`Logger` uses a special pattern
to achieve a good mix of convenience and flexibility
both for Felt and user code.
It uses late binding to allow runtime mutations
and it accepts a `Logger_State` argument for custom behavior.
Though the code is more verbose and slower as a result,
the tradeoffs make sense for logging in development.
TODO use a different logger in production

The default `Logger_State` is the `Logger` class itself.
This pattern allows us to have globally mutable logger state
without locking the code into the singleton pattern.
Properties like the static `Logger.level` can be mutated
to affect all loggers that get instantiated with the default state,
but loggers can also be instantiated with other state
that isn't affected by these globally mutable values.

Custom loggers like `System_Logger` (see below)
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

export interface Logger_State {
	level: Log_Level;
	log: Log;
	error: Log_Level_Defaults;
	warn: Log_Level_Defaults;
	info: Log_Level_Defaults;
	trace: Log_Level_Defaults;
}

interface Log_Level_Defaults {
	prefixes: any[];
	suffixes: any[];
}

export class Dev_Logger {
	readonly prefixes: readonly any[];
	readonly suffixes: readonly any[];
	readonly state: Logger_State; // can be the implementing class constructor

	constructor(
		prefixes: readonly any[] | unknown,
		suffixes: readonly any[] | unknown,
		state: Logger_State,
	) {
		this.prefixes = to_array(prefixes);
		this.suffixes = to_array(suffixes);
		this.state = state;
	}

	error(...args: any[]): void {
		if (this.state.level < Log_Level.Error) return;
		this.state.log(
			...this.state.error.prefixes,
			...this.prefixes,
			...args,
			...this.suffixes,
			...this.state.error.suffixes,
		);
	}

	warn(...args: any[]): void {
		if (this.state.level < Log_Level.Warn) return;
		this.state.log(
			...this.state.warn.prefixes,
			...this.prefixes,
			...args,
			...this.suffixes,
			...this.state.warn.suffixes,
		);
	}

	info(...args: any[]): void {
		if (this.state.level < Log_Level.Info) return;
		this.state.log(
			...this.state.info.prefixes,
			...this.prefixes,
			...args,
			...this.suffixes,
			...this.state.info.suffixes,
		);
	}

	trace(...args: any[]): void {
		if (this.state.level < Log_Level.Trace) return;
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

export class Logger extends Dev_Logger {
	constructor(
		prefixes: readonly any[] | unknown = EMPTY_ARRAY,
		suffixes: readonly any[] | unknown = EMPTY_ARRAY,
		state: Logger_State = Logger,
	) {
		super(prefixes, suffixes, state);
	}

	// These properties can be mutated at runtime (see `configure_log_level`)
	// to affect all loggers instantiated with the default `state`.
	// See the comment on `Logger_State` for more.
	static level: Log_Level = DEFAULT_LOG_LEVEL;
	static log: Log = console.log.bind(console);
	static error: Log_Level_Defaults = {
		prefixes: [red('➤'), black(red_bg(' 🞩 error 🞩 ')), red('\n➤')],
		suffixes: ['\n ', black(red_bg(' 🞩🞩 '))],
	};
	static warn: Log_Level_Defaults = {
		prefixes: [yellow('➤'), black(yellow_bg(' ⚑ warning ⚑ ')), '\n' + yellow('➤')],
		suffixes: ['\n ', black(yellow_bg(' ⚑ '))],
	};
	static info: Log_Level_Defaults = {
		prefixes: [gray('➤')],
		suffixes: [],
	};
	static trace: Log_Level_Defaults = {
		prefixes: [gray('—')],
		suffixes: [],
	};
}

/*

The `System_Logger` is distinct from the `Logger`
to cleanly separate Felt's logging from user logging, decoupling their log levels.
Felt internally uses `System_Logger`, not `Logger` directly.
This allows user code to simply import and use `Logger`.
`System_Logger` is still made available to user code,
and users can always extend `Logger` with their own custom versions.

*/
export class System_Logger extends Dev_Logger {
	constructor(
		prefixes: readonly any[] | unknown = EMPTY_ARRAY,
		suffixes: readonly any[] | unknown = EMPTY_ARRAY,
		state: Logger_State = System_Logger,
	) {
		super(prefixes, suffixes, state);
	}

	// These properties can be mutated at runtime (see `configure_log_level`)
	// to affect all loggers instantiated with the default `state`.
	// See the comment on `Logger_State` for more.
	static level: Log_Level = DEFAULT_LOG_LEVEL;
	static log: Log = console.log.bind(console);
	static error: Log_Level_Defaults = {
		prefixes: [red('➤'), black(red_bg(' 🞩 error 🞩 ')), red('\n➤')],
		suffixes: ['\n ', black(red_bg(' 🞩🞩 '))],
	};
	static warn: Log_Level_Defaults = {
		prefixes: [yellow('➤'), black(yellow_bg(' ⚑ warning ⚑ ')), '\n' + yellow('➤')],
		suffixes: ['\n ', black(yellow_bg(' ⚑ '))],
	};
	static info: Log_Level_Defaults = {
		prefixes: [gray('➤')],
		suffixes: [],
	};
	static trace: Log_Level_Defaults = {
		prefixes: [gray('—')],
		suffixes: [],
	};
}

export const configure_log_level = (
	level: Log_Level,
	configure_main_logger = true,
	configure_system_logger = true,
): void => {
	if (configure_main_logger) {
		Logger.level = level;
	}
	if (configure_system_logger) {
		System_Logger.level = level;
	}
};

export const print_log_label = (label: string, color = magenta): string =>
	`${gray('[')}${color(label)}${gray(']')}`;
