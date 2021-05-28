import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {toEnvString, toEnvNumber} from './env.js';

/* test_toEnvString */
const test_toEnvString = suite('toEnvString');

test_toEnvString('basic behavior', async () => {
	process.env.GRO_TEST_1 = '1';
	t.is(toEnvString('GRO_TEST_1'), '1');
	t.is(toEnvString('GRO_TEST_1', '2'), '1');
	t.is(toEnvString('GRO_TEST_MISSING'), undefined);
	t.is(toEnvString('GRO_TEST_MISSING', '1'), '1');
});

test_toEnvString.run();
/* /test_toEnvString */

/* test_toEnvNumber */
const test_toEnvNumber = suite('toEnvNumber');

test_toEnvNumber('basic behavior', async () => {
	process.env.GRO_TEST_1 = '1';
	t.is(toEnvNumber('GRO_TEST_1'), 1);
	t.is(toEnvNumber('GRO_TEST_1', 2), 1);
	t.is(toEnvNumber('GRO_TEST_MISSING'), undefined);
	t.is(toEnvNumber('GRO_TEST_MISSING', 1), 1);
});

test_toEnvNumber.run();
/* /test_toEnvNumber */
