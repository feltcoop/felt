import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {mapRecord, omit, pickBy, omitUndefined, reorder} from './object.js';

/* test_mapRecord */
const test_mapRecord = suite('mapRecord');

test_mapRecord('basic behavior', () => {
	t.equal(
		mapRecord({a: 1, b: 2}, (v, k) => v + k),
		{a: '1a', b: '2b'},
	);
	t.equal(
		mapRecord({}, (v, k) => v + k),
		{},
	);
});

test_mapRecord.run();
/* /test_mapRecord */

/* test_omit */
const test_omit = suite('omit');

test_omit('basic behavior', () => {
	t.equal(omit({a: 1, b: 2}, ['b']), {a: 1});
	t.equal(omit({a: 1, b: 2}, []), {a: 1, b: 2});
	t.equal(omit({a: 1, b: 2}, ['b', 'a']), {});
});

test_omit.run();
/* /test_omit */

/* test_pickBy */
const test_pickBy = suite('pickBy');

test_pickBy('basic behavior', () => {
	t.equal(
		pickBy({a: 1, b: 2}, (v) => v === 1),
		{a: 1},
	);
	t.equal(
		pickBy({a: 1, b: 2}, (_v, k) => k === 'a'),
		{a: 1},
	);
	t.equal(
		pickBy({a: 1, b: 2}, () => false),
		{},
	);
	t.equal(
		pickBy({a: 1, b: 2}, () => true),
		{a: 1, b: 2},
	);
});

test_pickBy.run();
/* /test_pickBy */

/* test_omitUndefined */
const test_omitUndefined = suite('omitUndefined');

test_omitUndefined('basic behavior', () => {
	t.equal(omitUndefined({a: 1, b: undefined, c: undefined}), {a: 1});
	t.equal(omitUndefined({a: undefined, b: 2, c: undefined}), {b: 2});
	t.equal(omitUndefined({a: 1, b: 2}), {a: 1, b: 2});
	t.equal(omitUndefined({a: undefined, b: undefined}), {} as any);
	t.equal(omitUndefined({}), {});
});

test_omitUndefined.run();
/* /test_omitUndefined */

/* test_reorder */
const test_reorder = suite('reorder');

test_reorder('basic behavior', () => {
	t.is(
		JSON.stringify(reorder({a: 1, b: 2, c: 3, d: 4}, ['d', 'b', 'c', 'a'])),
		JSON.stringify({d: 4, b: 2, c: 3, a: 1}),
	);
});

test_reorder.run();
/* /test_reorder */
