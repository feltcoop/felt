import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {createStopwatch, Timings} from './time.js';

/* test_createStopwatch */
const test_createStopwatch = suite('createStopwatch');

test_createStopwatch('basic behavior', () => {
	const stopwatch = createStopwatch(4);
	const elapsed = stopwatch();
	t.ok(elapsed.toString().split('.')[1].length <= 4);
});

test_createStopwatch.run();
/* /test_createStopwatch */

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
	const timingToFoo = timings.start('foo');
	const elapsed = timingToFoo();
	t.ok(elapsed.toString().split('.')[1].length <= 4);
	t.throws(() => timingToFoo());
	t.throws(() => timingToFoo());
	t.is(elapsed, timings.get('foo'));
});

test_Timings('merge timings', () => {
	const a = new Timings(10);
	const b = new Timings(10);
	const timingA = a.start('test');
	const aTiming = timingA();
	t.ok(aTiming);
	const timingB = b.start('test');
	const bTiming = timingB();
	t.ok(bTiming);
	a.merge(b);
	t.is(a.get('test'), aTiming + bTiming);
	t.is(b.get('test'), bTiming);
});

test_Timings.run();
/* /test_Timings */
