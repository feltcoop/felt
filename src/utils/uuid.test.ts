import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {uuid, isUuid} from './uuid.js';

/* test_uuid */
const test_uuid = suite('uuid');

test_uuid('basic behavior', () => {
	t.ok(uuid());
	t.is(uuid().length, 36);
});

test_uuid.run();
/* /test_uuid */

/* test_isUuid */
const test_isUuid = suite('isUuid');

test_isUuid('basic behavior', () => {
	t.ok(isUuid(uuid()));
	t.ok(isUuid('f81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
	t.not.ok(isUuid('g81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
	t.not.ok(isUuid(''));
	t.not.ok(isUuid(null!));
	t.not.ok(isUuid(undefined!));

	// See the implementation's comments for why the namespace syntax is not supported.
	t.not.ok(isUuid('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
});

test_isUuid.run();
/* /test_isUuid */
