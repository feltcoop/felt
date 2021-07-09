import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {create_stopwatch, Timings} from '$lib/util/timings.js';

/* test_create_stopwatch */
const test_create_stopwatch = suite('create_stopwatch');

test_create_stopwatch('basic behavior', () => {
	const stopwatch = create_stopwatch(4);
	const elapsed = stopwatch();
	t.ok(elapsed.toString().split('.')[1].length <= 4);
});

test_create_stopwatch.run();
/* /test_create_stopwatch */

/* test_Timings */
const test_Timings = suite('Timings');

test_Timings('start and stop', () => {
	const timings = new Timings<'foo' | 'bar'>(4);
	const timing = timings.start('foo');
	t.throws(() => timings.start('foo'));
	timing();
	t.throws(() => timing());
	const elapsed = timings.get('foo');
	t.throws(() => timings.get('bar'));
	t.ok(elapsed.toString().split('.')[1].length <= 4);

	// we don't want to actually call this - what a better pattern?
	const typechecking = () => {
		// @ts-expect-error
		timings.start('no');
		// @ts-expect-error
		timings.start('nope' as string);
	};
	typechecking;
});

test_Timings('start with stop callback', () => {
	const timings = new Timings<'foo'>(4);
	const timing = timings.start('foo');
	const elapsed = timing();
	t.ok(elapsed.toString().split('.')[1].length <= 4);
	t.throws(() => timing());
	t.throws(() => timing());
	t.is(elapsed, timings.get('foo'));
});

test_Timings('merge timings', () => {
	const a = new Timings(10);
	const b = new Timings(10);
	const timing_a = a.start('test');
	const a_timing = timing_a();
	t.ok(a_timing);
	const timing_b = b.start('test');
	const b_timing = timing_b();
	t.ok(b_timing);
	a.merge(b);
	t.is(a.get('test'), a_timing + b_timing);
	t.is(b.get('test'), b_timing);
});

test_Timings.run();
/* /test_Timings */
