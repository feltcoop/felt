import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {randomFloat, randomInt, randomItem} from './random.js';

/* test_randomFloat */
const test_randomFloat = suite('randomFloat');

test_randomFloat('-5.5 to 7', () => {
	for (let i = 0; i < 20; i++) {
		const result = randomFloat(-5.5, 7);
		t.ok(result >= -5.5);
		t.ok(result < 7);
	}
});

test_randomFloat.run();
/* /test_randomFloat */

/* test_randomInt */
const test_randomInt = suite('randomInt');

test_randomInt('0 to 1', () => {
	const items = [0, 1];
	const results = [];
	for (let i = 0; i < 20; i++) {
		const result = randomInt(0, 1);
		t.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		t.ok(results.includes(item));
	}
});

test_randomInt('1 to 5', () => {
	const items = [1, 2, 3, 4, 5];
	const results = [];
	for (let i = 0; i < 100; i++) {
		const result = randomInt(1, 5);
		t.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		t.ok(results.includes(item));
	}
});

test_randomInt('-3 to 2', () => {
	const items = [-3, -2, -1, 0, 1, 2];
	const results = [];
	for (let i = 0; i < 100; i++) {
		const result = randomInt(-3, 2);
		t.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		t.ok(results.includes(item));
	}
});

test_randomInt('2 to 2', () => {
	t.is(randomInt(2, 2), 2);
});

test_randomInt.run();
/* /test_randomInt */

/* test_randomItem */
const test_randomItem = suite('randomItem');

test_randomItem('a and b', () => {
	const items = ['a', 'b'];
	const results = [];
	for (let i = 0; i < 20; i++) {
		const result = randomItem(items)!;
		t.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		t.ok(results.includes(item));
	}
});
test_randomItem('1 to 5', () => {
	const items = [1, 2, 3, 4, 5];
	const results = [];
	for (let i = 0; i < 100; i++) {
		const result = randomItem(items)!;
		t.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		t.ok(results.includes(item));
	}
});
test_randomItem('empty array', () => {
	t.is(randomItem([]), undefined);
});

test_randomItem.run();
/* /test_randomItem */
