import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {last, to_array} from './array.js';

/* test_last */
const test_last = suite('last');

test_last('basic behavior', () => {
	t.is(last([1, 2]), 2);
	t.is(last([1]), 1);
	t.is(last([]), undefined);
});

test_last.run();
/* /test_last */

/* test_to_array */
const test_to_array = suite('to_array');

test_to_array('basic behavior', () => {
	const array = [1, 2, 3];
	t.is(array, to_array(array));
	t.equal([1], to_array(1));
	t.equal([{a: 1}], to_array({a: 1}));
});

test_to_array.run();
/* /test_to_array */
