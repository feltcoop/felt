// public API for `@feltcoop/felt`:

export * as icons from './lib/icons.js';

// types
export * from './utils/types.js';

// TODO consider what top-level public API makes sense -
// for now we're preferring deep imports to specific modules -
// these are Gro's old exports:
// // utils
// export type {Async_Status} from './utils/async.js';
// export {wait, wrap} from './utils/async.js';
// export type {Spawned_Process, Spawn_Result} from './utils/process.js';
// export type {Lazy} from './utils/function.js';
// export {Unreachable_Error} from './utils/error.js';
// export {last, to_array, EMPTY_ARRAY} from './utils/array.js';
// export type {Log, Logger_State} from './utils/log.js';
// export {
// 	Log_Level,
// 	Logger,
// 	System_Logger,
// 	Dev_Logger,
// 	ENV_LOG_LEVEL,
// 	DEFAULT_LOG_LEVEL,
// 	configure_log_level,
// 	print_log_label,
// } from './utils/log.js';
// export {Timings, create_stopwatch} from './utils/time.js';
// export type {Stopwatch} from './utils/time.js';
