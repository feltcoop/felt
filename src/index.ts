// public API for `@feltcoop/felt`:

export * as icons from './lib/icons.js';

// types
export * from './lib/util/types.js';

// TODO consider what top-level public API makes sense -
// for now we're preferring deep imports to specific modules -
// these are Gro's old exports:
// // utils
// export type {Async_Status} from './util/async.js';
// export {wait, wrap} from './util/async.js';
// export type {Spawned_Process, Spawn_Result} from './util/process.js';
// export type {Lazy} from './util/function.js';
// export {Unreachable_Error} from './util/error.js';
// export {last, to_array, EMPTY_ARRAY} from './util/array.js';
// export type {Log, Logger_State} from './util/log.js';
// export {
// 	Log_Level,
// 	Logger,
// 	System_Logger,
// 	Dev_Logger,
// 	ENV_LOG_LEVEL,
// 	DEFAULT_LOG_LEVEL,
// 	configure_log_level,
// 	print_log_label,
// } from './util/log.js';
// export {Timings, create_stopwatch} from './util/time.js';
// export type {Stopwatch} from './util/time.js';
