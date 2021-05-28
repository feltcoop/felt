import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {sortMap} from './map.js';

/* test_sortMap */
const test_sortMap = suite('sortMap');

test_sortMap('basic behavior', () => {
	t.equal(
		Array.from(
			sortMap(
				new Map([
					['A', 1],
					['B', 1],
					['C', 1],
					['d', 1],
					['a', 1],
					['c', 1],
					['b', 1],
				]),
			).keys(),
		),
		Array.from(
			new Map([
				['a', 1],
				['A', 1],
				['b', 1],
				['B', 1],
				['c', 1],
				['C', 1],
				['d', 1],
			]).keys(),
		),
	);
});

test_sortMap('custom comparator', () => {
	t.equal(
		sortMap(
			new Map([
				['d', 1],
				['a', 1],
				['c', 1],
				['b', 1],
			]),
			(a, b) => (a[0] > b[0] ? -1 : 1),
		),
		new Map([
			['d', 1],
			['c', 1],
			['b', 1],
			['a', 1],
		]),
	);
});

test_sortMap.run();
/* /test_sortMap */
