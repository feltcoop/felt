import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {create_lock} from '$lib/util/lock.js';

/* test_create_lock */
const test_create_lock = suite('create_lock');

test_create_lock('basic behavior', () => {
	const lock = create_lock();
	const run_lifecycle = (key: any) => {
		t.not.ok(lock.has(key));
		t.not.ok(lock.unlock(key));
		t.is(lock.peek(), null);
		t.ok(lock.lock(key));
		t.ok(lock.has(key));
		t.is(lock.peek(), key);
		t.ok(lock.lock(key));
		t.ok(lock.has(key));
		t.not.ok(lock.lock({}));
		t.is(lock.peek(), key);
		t.ok(lock.unlock(key));
		t.not.ok(lock.has(key));
		t.is(lock.peek(), null);
		t.not.ok(lock.unlock(key));
	};
	const key1 = {};
	// lock lifecycle
	run_lifecycle(key1);
	// lock lifecycle again
	run_lifecycle(key1);
	// lock lifecycle again with a new key
	run_lifecycle({});
});

test_create_lock.run();
/* /test_create_lock */
