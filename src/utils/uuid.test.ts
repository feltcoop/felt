import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {uuid, is_uuid} from './uuid.js';

/* test_uuid */
const test_uuid = suite('uuid');

test_uuid('basic behavior', () => {
	t.ok(uuid());
	t.is(uuid().length, 36);
});

test_uuid.run();
/* /test_uuid */

/* test_is_uuid */
const test_is_uuid = suite('is_uuid');

test_is_uuid('basic behavior', () => {
	t.ok(is_uuid(uuid()));
	t.ok(is_uuid('f81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
	t.not.ok(is_uuid('g81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
	t.not.ok(is_uuid(''));
	t.not.ok(is_uuid(null!));
	t.not.ok(is_uuid(undefined!));

	// See the implementation's comments for why the namespace syntax is not supported.
	t.not.ok(is_uuid('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
});

test_is_uuid.run();
/* /test_is_uuid */
