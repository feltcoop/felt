export type Unobtain = () => Promise<void>;

/*

This is a higher order function that tracks obtained references to a thing
and calls `teardown_obtainable_value` when all obtainers have let go of their references.

It allows decoupled consumers to use things with a lifecycle
without disrupting each other when they're done with the thing.
It can also be used to create lazily instantiated references.

The motivating use case was reusing a database connection across multiple tasks.

See the tests for usage examples - ./obtainable.test.ts

*/
export const to_obtainable = <T>(
	to_obtainable_value: () => T,
	teardown_obtainable_value?: (obtainable: T) => unknown,
): (() => [T, Unobtain]) => {
	let obtainable: T | undefined;
	const obtained_refs = new Set<symbol>();
	let resolve: () => void;
	let promise: Promise<void>;
	const unobtain = async (obtained_ref: symbol): Promise<void> => {
		if (!obtained_refs.has(obtained_ref)) return promise; // makes unobtaining idempotent per obtainer
		obtained_refs.delete(obtained_ref);
		if (obtained_refs.size > 0) return promise; // there are other open obtainers
		const final_value = obtainable;
		obtainable = undefined; // reset before unobtaining just in case unobtain re-obtains
		if (teardown_obtainable_value) await teardown_obtainable_value(final_value!);
		resolve();
		return promise;
	};
	return () => {
		const obtained_ref = Symbol();
		obtained_refs.add(obtained_ref);
		if (obtainable === undefined) {
			obtainable = to_obtainable_value();
			promise = new Promise<void>((r) => (resolve = r));
			if (obtainable === undefined) {
				// this prevents `obtain` from being called multiple times,
				// which would cause bugs if it has side effects
				throw Error('Obtainable value cannot be undefined - use null instead.');
			}
		}
		return [obtainable, () => unobtain(obtained_ref)];
	};
};
