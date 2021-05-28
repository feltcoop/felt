import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {last, toArray} from './array.js';

/* test_last */
const test_last = suite('last');

test_last('basic behavior', () => {
	t.is(last([1, 2]), 2);
	t.is(last([1]), 1);
	t.is(last([]), undefined);
});

test_last.run();
/* /test_last */

/* test_toArray */
const test_toArray = suite('toArray');

test_toArray('basic behavior', () => {
	const array = [1, 2, 3];
	t.is(array, toArray(array));
	t.equal([1], toArray(1));
	t.equal([{a: 1}], toArray({a: 1}));
});

test_toArray.run();
/* /test_toArray */
