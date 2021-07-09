import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {get_json_type} from '$lib/util/json.js';

/* test_get_json_type */
const test_get_json_type = suite('get_json_type');

test_get_json_type('basic behavior', () => {
	t.is(get_json_type(''), 'string');
	t.is(get_json_type('1'), 'string');
	t.is(get_json_type(1), 'number');
	t.is(get_json_type(NaN), 'number');
	t.is(get_json_type(Infinity), 'number');
	t.is(get_json_type(false), 'boolean');
	t.is(get_json_type({}), 'object');
	t.is(get_json_type(null), 'null');
	t.is(get_json_type([]), 'array');
	t.throws(() => get_json_type(undefined as any));
	t.throws(() => get_json_type((() => {}) as any));
	t.throws(() => get_json_type(BigInt(9000) as any));
	t.throws(() => get_json_type(Symbol() as any));
});

test_get_json_type.run();
/* /test_get_json_type */
