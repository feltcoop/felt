import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {map_record, omit, pick_by, omit_undefined, reorder} from './object.js';

/* test_map_record */
const test_map_record = suite('map_record');

test_map_record('basic behavior', () => {
	t.equal(
		map_record({a: 1, b: 2}, (v, k) => v + k),
		{a: '1a', b: '2b'},
	);
	t.equal(
		map_record({}, (v, k) => v + k),
		{},
	);
});

test_map_record.run();
/* /test_map_record */

/* test_omit */
const test_omit = suite('omit');

test_omit('basic behavior', () => {
	t.equal(omit({a: 1, b: 2}, ['b']), {a: 1});
	t.equal(omit({a: 1, b: 2}, []), {a: 1, b: 2});
	t.equal(omit({a: 1, b: 2}, ['b', 'a']), {});
});

test_omit.run();
/* /test_omit */

/* test_pick_by */
const test_pick_by = suite('pick_by');

test_pick_by('basic behavior', () => {
	t.equal(
		pick_by({a: 1, b: 2}, (v) => v === 1),
		{a: 1},
	);
	t.equal(
		pick_by({a: 1, b: 2}, (_v, k) => k === 'a'),
		{a: 1},
	);
	t.equal(
		pick_by({a: 1, b: 2}, () => false),
		{},
	);
	t.equal(
		pick_by({a: 1, b: 2}, () => true),
		{a: 1, b: 2},
	);
});

test_pick_by.run();
/* /test_pick_by */

/* test_omit_undefined */
const test_omit_undefined = suite('omit_undefined');

test_omit_undefined('basic behavior', () => {
	t.equal(omit_undefined({a: 1, b: undefined, c: undefined}), {a: 1});
	t.equal(omit_undefined({a: undefined, b: 2, c: undefined}), {b: 2});
	t.equal(omit_undefined({a: 1, b: 2}), {a: 1, b: 2});
	t.equal(omit_undefined({a: undefined, b: undefined}), {} as any);
	t.equal(omit_undefined({}), {});
});

test_omit_undefined.run();
/* /test_omit_undefined */

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
