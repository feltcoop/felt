import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {to_env_string, to_env_number} from '$lib/util/env.js';

/* test_to_env_string */
const test_to_env_string = suite('to_env_string');

test_to_env_string('basic behavior', async () => {
	process.env.GRO_TEST_1 = '1';
	t.is(to_env_string('GRO_TEST_1'), '1');
	t.is(to_env_string('GRO_TEST_1', '2'), '1');
	t.is(to_env_string('GRO_TEST_MISSING'), undefined);
	t.is(to_env_string('GRO_TEST_MISSING', '1'), '1');
});

test_to_env_string.run();
/* /test_to_env_string */

/* test_to_env_number */
const test_to_env_number = suite('to_env_number');

test_to_env_number('basic behavior', async () => {
	process.env.GRO_TEST_1 = '1';
	t.is(to_env_number('GRO_TEST_1'), 1);
	t.is(to_env_number('GRO_TEST_1', 2), 1);
	t.is(to_env_number('GRO_TEST_MISSING'), undefined);
	t.is(to_env_number('GRO_TEST_MISSING', 1), 1);
});

test_to_env_number.run();
/* /test_to_env_number */
