// public API for `@feltcoop/felt`:

export * as icons from './lib/icons.js';

// types
export * from './utils/types.js';

// TODO consider what top-level public API makes sense -
// for now we're preferring deep imports to specific modules -
// these are Gro's old exports:
// // utils
// export type {AsyncStatus} from './utils/async.js';
// export {wait, wrap} from './utils/async.js';
// export type {SpawnedProcess, SpawnResult} from './utils/process.js';
// export type {Lazy} from './utils/function.js';
// export type {ErrorClass} from './utils/error.js';
// export {UnreachableError} from './utils/error.js';
// export {last, toArray, EMPTY_ARRAY} from './utils/array.js';
// export type {Log, LoggerState} from './utils/log.js';
// export {
// 	LogLevel,
// 	Logger,
// 	SystemLogger,
// 	DevLogger,
// 	ENV_LOG_LEVEL,
// 	DEFAULT_LOG_LEVEL,
// 	configureLogLevel,
// 	printLogLabel,
// } from './utils/log.js';
// export {Timings, createStopwatch} from './utils/time.js';
// export type {Stopwatch} from './utils/time.js';
