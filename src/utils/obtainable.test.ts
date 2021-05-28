import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {toObtainable} from './obtainable.js';

/* test_toObtainable */
const test_toObtainable = suite('toObtainable');

test_toObtainable('unobtain out of order', async () => {
	let thing: Symbol | undefined;
	let isUnobtained = false;
	const obtainThing = toObtainable(
		() => {
			t.is(thing, undefined);
			thing = Symbol();
			return thing;
		},
		(thingUnobtained) => {
			isUnobtained = true;
			t.is(thingUnobtained, thing);
		},
	);

	const [thing1, unobtain1] = obtainThing();
	t.is(thing1, thing);
	t.not.ok(isUnobtained);

	const [thing2, unobtain2] = obtainThing();
	t.is(thing2, thing);
	t.not.ok(isUnobtained);
	t.is.not(unobtain1, unobtain2); // unobtain function refs should not be the same

	const [thing3, unobtain3] = obtainThing();
	t.is(thing3, thing);
	t.not.ok(isUnobtained);

	const unobtainPromise2 = unobtain2();
	t.not.ok(isUnobtained);
	t.ok(unobtainPromise2 instanceof Promise);

	const unobtainPromise3 = unobtain3();
	unobtain3(); // call unobtain additional times to make sure it's idempotent
	unobtain3();
	unobtain3();
	t.not.ok(isUnobtained);
	t.ok(unobtainPromise3 instanceof Promise);

	const unobtainPromise1 = unobtain1();
	t.ok(isUnobtained);
	t.ok(unobtainPromise1 instanceof Promise);
	await unobtainPromise1; // this will hang if never resolved

	const originalThing = thing;
	thing = undefined;
	isUnobtained = false;
	const [thing4, unobtain4] = obtainThing();
	t.ok(thing4);
	t.is(thing4, thing);
	t.is.not(thing4, originalThing);
	t.not.ok(isUnobtained);
	const unobtainPromise4 = unobtain4();
	t.ok(isUnobtained);
	t.ok(unobtainPromise4 instanceof Promise);
	t.is.not(unobtainPromise4, unobtainPromise1);
	await unobtainPromise4; // this will hang if never resolved
});

// This is a complicated corner case that probably should not happen
// because it would normally cause a stack overflow in user code,
// but we're covering it just in case.
test_toObtainable('obtain is called during unobtain', () => {
	let shouldObtainDuringUnobtain = true;
	let thing: Symbol | undefined;
	let isUnobtained = false;
	const obtainThing = toObtainable(
		() => {
			t.is(thing, undefined);
			isUnobtained = false;
			thing = Symbol();
			return thing;
		},
		(thingUnobtained) => {
			isUnobtained = true;
			t.is(thingUnobtained, thing);
			thing = undefined;

			if (!shouldObtainDuringUnobtain) return; // prevent stack overflow
			shouldObtainDuringUnobtain = false;
			const [thing3, unobtain3] = obtainThing();
			t.ok(thing3);
			t.is(thing3, thing);
			t.is.not(thing3, thingUnobtained);
			t.not.ok(isUnobtained);
			unobtain3();
			t.ok(isUnobtained);
			t.is(thing, undefined);
		},
	);

	const [thing1, unobtain1] = obtainThing();
	t.is(thing1, thing);
	t.not.ok(isUnobtained);

	const [thing2, unobtain2] = obtainThing();
	t.is(thing2, thing);
	t.not.ok(isUnobtained);

	unobtain2();
	t.not.ok(isUnobtained);

	unobtain1();
	t.ok(isUnobtained);
});

test_toObtainable('cannot obtain undefined', () => {
	const obtainThing = toObtainable(
		() => undefined,
		() => {},
	);
	t.throws(() => obtainThing());
});

test_toObtainable.run();
/* /test_toObtainable */
