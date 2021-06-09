import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {Logger, Log_Level, Logger_State} from './log.js';

/* test_Logger */
interface Test_Logger_Context {
	logged_args: any;
	logger_state: Logger_State;
}
const create_test_logger_context = (): Test_Logger_Context => {
	const ctx: Test_Logger_Context = {
		logged_args: undefined, // stores the result of the latest log call
		logger_state: {
			level: Log_Level.Trace,
			log: (...log_args: any[]) => {
				ctx.logged_args = log_args;
			},
			error: {
				prefixes: ['error_p1', 'error_p2'],
				suffixes: ['error_s1', 'error_s2'],
			},
			warn: {
				prefixes: ['warn_p1', 'warn_p2'],
				suffixes: ['warn_s1', 'warn_s2'],
			},
			info: {
				prefixes: ['info_p1', 'info_p2'],
				suffixes: ['info_s1', 'info_s2'],
			},
			trace: {
				prefixes: ['trace_p1', 'trace_p2'],
				suffixes: ['trace_s1', 'trace_s2'],
			},
		},
	};
	return ctx;
};
const test_Logger = suite('Logger', create_test_logger_context());

test_Logger('prefixes and suffixes', (ctx) => {
	const log = new Logger(['p1', 'p2'], ['s1', 's2'], ctx.logger_state);

	log.error('foo', 36);
	t.equal(ctx.logged_args, [
		'error_p1',
		'error_p2',
		'p1',
		'p2',
		'foo',
		36,
		's1',
		's2',
		'error_s1',
		'error_s2',
	]);
	ctx.logged_args = undefined;

	log.warn('foo', 36);
	t.equal(ctx.logged_args, [
		'warn_p1',
		'warn_p2',
		'p1',
		'p2',
		'foo',
		36,
		's1',
		's2',
		'warn_s1',
		'warn_s2',
	]);
	ctx.logged_args = undefined;

	log.info('foo', 36);
	t.equal(ctx.logged_args, [
		'info_p1',
		'info_p2',
		'p1',
		'p2',
		'foo',
		36,
		's1',
		's2',
		'info_s1',
		'info_s2',
	]);
	ctx.logged_args = undefined;

	log.trace('foo', 36);
	t.equal(ctx.logged_args, [
		'trace_p1',
		'trace_p2',
		'p1',
		'p2',
		'foo',
		36,
		's1',
		's2',
		'trace_s1',
		'trace_s2',
	]);
	ctx.logged_args = undefined;
});

test_Logger('mutate logger state to change prefix and suffix', (ctx) => {
	const log = new Logger(undefined, undefined, {
		...ctx.logger_state,
		info: {
			prefixes: ['p1', 'p2'],
			suffixes: ['s1', 's2'],
		},
	});
	log.info('foo', 36);
	t.equal(ctx.logged_args, ['p1', 'p2', 'foo', 36, 's1', 's2']);
	ctx.logged_args = undefined;

	// mutate the prefixes and suffixes
	log.state.info.prefixes.pop();
	log.state.info.suffixes.shift();

	log.info('foo', 36);
	t.equal(ctx.logged_args, ['p1', 'foo', 36, 's2']);
	ctx.logged_args = undefined;
});

test_Logger('mutate logger state to change log level', (ctx) => {
	const state = {
		...ctx.logger_state,
		info: {prefixes: [], suffixes: []},
		warn: {prefixes: [], suffixes: []},
	};
	const log = new Logger(undefined, undefined, state);

	log.info('foo');
	t.equal(ctx.logged_args, ['foo']);
	ctx.logged_args = undefined;

	state.level = Log_Level.Warn;

	// `info` should now be silenced
	log.info('foo');
	t.equal(ctx.logged_args, undefined);

	// `warn` is not silenced though
	log.warn('foo');
	t.equal(ctx.logged_args, ['foo']);
	ctx.logged_args = undefined;
});

test_Logger.run();
/* /test_Logger */
