import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {Logger, LogLevel, LoggerState} from './log.js';

/* test_Logger */
interface TestLoggerContext {
	loggedArgs: any;
	loggerState: LoggerState;
}
const createTestLoggerContext = (): TestLoggerContext => {
	const ctx: TestLoggerContext = {
		loggedArgs: undefined, // stores the result of the latest log call
		loggerState: {
			level: LogLevel.Trace,
			log: (...logArgs: any[]) => {
				ctx.loggedArgs = logArgs;
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
const test_Logger = suite('Logger', createTestLoggerContext());

test_Logger('prefixes and suffixes', (ctx) => {
	const log = new Logger(['p1', 'p2'], ['s1', 's2'], ctx.loggerState);

	log.error('foo', 36);
	t.equal(ctx.loggedArgs, [
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
	ctx.loggedArgs = undefined;

	log.warn('foo', 36);
	t.equal(ctx.loggedArgs, [
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
	ctx.loggedArgs = undefined;

	log.info('foo', 36);
	t.equal(ctx.loggedArgs, [
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
	ctx.loggedArgs = undefined;

	log.trace('foo', 36);
	t.equal(ctx.loggedArgs, [
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
	ctx.loggedArgs = undefined;
});

test_Logger('mutate logger state to change prefix and suffix', (ctx) => {
	const log = new Logger(undefined, undefined, {
		...ctx.loggerState,
		info: {
			prefixes: ['p1', 'p2'],
			suffixes: ['s1', 's2'],
		},
	});
	log.info('foo', 36);
	t.equal(ctx.loggedArgs, ['p1', 'p2', 'foo', 36, 's1', 's2']);
	ctx.loggedArgs = undefined;

	// mutate the prefixes and suffixes
	log.state.info.prefixes.pop();
	log.state.info.suffixes.shift();

	log.info('foo', 36);
	t.equal(ctx.loggedArgs, ['p1', 'foo', 36, 's2']);
	ctx.loggedArgs = undefined;
});

test_Logger('mutate logger state to change log level', (ctx) => {
	const state = {
		...ctx.loggerState,
		info: {prefixes: [], suffixes: []},
		warn: {prefixes: [], suffixes: []},
	};
	const log = new Logger(undefined, undefined, state);

	log.info('foo');
	t.equal(ctx.loggedArgs, ['foo']);
	ctx.loggedArgs = undefined;

	state.level = LogLevel.Warn;

	// `info` should now be silenced
	log.info('foo');
	t.equal(ctx.loggedArgs, undefined);

	// `warn` is not silenced though
	log.warn('foo');
	t.equal(ctx.loggedArgs, ['foo']);
	ctx.loggedArgs = undefined;
});

test_Logger.run();
/* /test_Logger */
