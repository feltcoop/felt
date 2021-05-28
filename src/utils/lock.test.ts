import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {createLock} from './lock.js';

/* test_createLock */
const test_createLock = suite('createLock');

test_createLock('basic behavior', () => {
	const lock = createLock();
	const runLifecycle = (key: any) => {
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
	runLifecycle(key1);
	// lock lifecycle again
	runLifecycle(key1);
	// lock lifecycle again with a new key
	runLifecycle({});
});

test_createLock.run();
/* /test_createLock */
