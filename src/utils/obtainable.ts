export type Unobtain = () => Promise<void>;

/*

This is a higher order function that tracks obtained references to a thing
and calls `teardownObtainableValue` when all obtainers have let go of their references.

It allows decoupled consumers to use things with a lifecycle
without disrupting each other when they're done with the thing.
It can also be used to create lazily instantiated references.

The motivating use case was reusing a database connection across multiple tasks.

See the tests for usage examples - ./obtainable.test.ts

*/
export const toObtainable = <T>(
	toObtainableValue: () => T,
	teardownObtainableValue?: (obtainable: T) => unknown,
): (() => [T, Unobtain]) => {
	let obtainable: T | undefined;
	const obtainedRefs = new Set<symbol>();
	let resolve: () => void;
	let promise: Promise<void>;
	const unobtain = async (obtainedRef: symbol): Promise<void> => {
		if (!obtainedRefs.has(obtainedRef)) return promise; // makes unobtaining idempotent per obtainer
		obtainedRefs.delete(obtainedRef);
		if (obtainedRefs.size > 0) return promise; // there are other open obtainers
		const finalValue = obtainable;
		obtainable = undefined; // reset before unobtaining just in case unobtain re-obtains
		if (teardownObtainableValue) await teardownObtainableValue(finalValue!);
		resolve();
		return promise;
	};
	return () => {
		const obtainedRef = Symbol();
		obtainedRefs.add(obtainedRef);
		if (obtainable === undefined) {
			obtainable = toObtainableValue();
			promise = new Promise<void>((r) => (resolve = r));
			if (obtainable === undefined) {
				// this prevents `obtain` from being called multiple times,
				// which would cause bugs if it has side effects
				throw Error('Obtainable value cannot be undefined - use null instead.');
			}
		}
		return [obtainable, () => unobtain(obtainedRef)];
	};
};
