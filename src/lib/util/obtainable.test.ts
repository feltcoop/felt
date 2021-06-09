import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {to_obtainable} from './obtainable.js';

/* test_to_obtainable */
const test_to_obtainable = suite('to_obtainable');

test_to_obtainable('unobtain out of order', async () => {
	let thing: Symbol | undefined;
	let is_unobtained = false;
	const obtain_thing = to_obtainable(
		() => {
			t.is(thing, undefined);
			thing = Symbol();
			return thing;
		},
		(thing_unobtained) => {
			is_unobtained = true;
			t.is(thing_unobtained, thing);
		},
	);

	const [thing1, unobtain1] = obtain_thing();
	t.is(thing1, thing);
	t.not.ok(is_unobtained);

	const [thing2, unobtain2] = obtain_thing();
	t.is(thing2, thing);
	t.not.ok(is_unobtained);
	t.is.not(unobtain1, unobtain2); // unobtain function refs should not be the same

	const [thing3, unobtain3] = obtain_thing();
	t.is(thing3, thing);
	t.not.ok(is_unobtained);

	const unobtain_promise2 = unobtain2();
	t.not.ok(is_unobtained);
	t.ok(unobtain_promise2 instanceof Promise);

	const unobtain_promise3 = unobtain3();
	unobtain3(); // call unobtain additional times to make sure it's idempotent
	unobtain3();
	unobtain3();
	t.not.ok(is_unobtained);
	t.ok(unobtain_promise3 instanceof Promise);

	const unobtain_promise1 = unobtain1();
	t.ok(is_unobtained);
	t.ok(unobtain_promise1 instanceof Promise);
	await unobtain_promise1; // this will hang if never resolved

	const original_thing = thing;
	thing = undefined;
	is_unobtained = false;
	const [thing4, unobtain4] = obtain_thing();
	t.ok(thing4);
	t.is(thing4, thing);
	t.is.not(thing4, original_thing);
	t.not.ok(is_unobtained);
	const unobtain_promise4 = unobtain4();
	t.ok(is_unobtained);
	t.ok(unobtain_promise4 instanceof Promise);
	t.is.not(unobtain_promise4, unobtain_promise1);
	await unobtain_promise4; // this will hang if never resolved
});

// This is a complicated corner case that probably should not happen
// because it would normally cause a stack overflow in user code,
// but we're covering it just in case.
test_to_obtainable('obtain is called during unobtain', () => {
	let should_obtain_during_unobtain = true;
	let thing: Symbol | undefined;
	let is_unobtained = false;
	const obtain_thing = to_obtainable(
		() => {
			t.is(thing, undefined);
			is_unobtained = false;
			thing = Symbol();
			return thing;
		},
		(thing_unobtained) => {
			is_unobtained = true;
			t.is(thing_unobtained, thing);
			thing = undefined;

			if (!should_obtain_during_unobtain) return; // prevent stack overflow
			should_obtain_during_unobtain = false;
			const [thing3, unobtain3] = obtain_thing();
			t.ok(thing3);
			t.is(thing3, thing);
			t.is.not(thing3, thing_unobtained);
			t.not.ok(is_unobtained);
			unobtain3();
			t.ok(is_unobtained);
			t.is(thing, undefined);
		},
	);

	const [thing1, unobtain1] = obtain_thing();
	t.is(thing1, thing);
	t.not.ok(is_unobtained);

	const [thing2, unobtain2] = obtain_thing();
	t.is(thing2, thing);
	t.not.ok(is_unobtained);

	unobtain2();
	t.not.ok(is_unobtained);

	unobtain1();
	t.ok(is_unobtained);
});

test_to_obtainable('cannot obtain undefined', () => {
	const obtain_thing = to_obtainable(
		() => undefined,
		() => {},
	);
	t.throws(() => obtain_thing());
});

test_to_obtainable.run();
/* /test_to_obtainable */
