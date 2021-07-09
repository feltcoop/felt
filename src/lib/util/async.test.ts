import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {wait, wrap} from '$lib/util/async.js';

/* test_wait */
const test_wait = suite('wait');

test_wait('basic behavior', async () => {
	await wait();
	await wait(10);
});

test_wait.run();
/* /test_wait */

/* test_wrap */
const test_wrap = suite('wrap');

test_wrap('basic behavior', async () => {
	let v = 'start';
	await wrap(async (after) => {
		t.is(v, 'start');
		after(async () => {
			await wait();
			v = 'after1';
		});
		after(() => t.is(v, 'after1'));
		after(async () => {
			await wait();
			v = 'after2';
		});
		after(() => t.is(v, 'after2'));
		after(async () => {
			await wait();
			v = 'after3';
		});
		after(() => t.is(v, 'after3'));
		t.is(v, 'start');
	});
	t.is(v, 'after3');
});

test_wrap.run();
/* /test_wrap */
