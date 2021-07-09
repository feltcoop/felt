import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {mix, round} from '$lib/util/math.js';

/* test_mix */
const test_mix = suite('mix');

test_mix('mixes two numbers', () => {
	t.is(mix(0, 10, 0.2), 2);
});

test_mix('finds the midpoint between two numbers', () => {
	t.is(mix(1, 3, 0.5), 2);
});

test_mix('mixes with 0', () => {
	t.is(mix(1, 3, 0), 1);
});

test_mix('mixes with 1', () => {
	t.is(mix(1, 3, 1), 3);
});

test_mix.run();
/* /test_mix */

/* test_round */
const test_round = suite('round');

test_round('rounds a number up to 3 decimals', () => {
	t.is(round(0.0349, 3), 0.035);
});

test_round('rounds a negative number down to 5 decimals', () => {
	t.is(round(-1.6180339, 5), -1.61803);
});

test_round.run();
/* /test_round */
