import type {Omit_Strict} from './types.js';

// Iterated keys in `for..in` are always returned as strings,
// so to prevent usage errors the key type of `mapper` is always a string.
// Symbols are not enumerable as keys, so they're excluded.
export const map_record = <T, K extends string | number, U>(
	obj: Record<K, T>,
	mapper: (value: T, key: string) => U,
): Record<K, U> => {
	const result = {} as Record<K, U>;
	for (const key in obj) {
		result[key] = mapper(obj[key], key);
	}
	return result;
};

export const omit = <T extends Record<K, any>, K extends keyof T>(
	obj: T,
	keys: K[],
): Omit_Strict<T, K> => {
	const result = {} as T;
	for (const key in obj) {
		if (!keys.includes(key as any)) {
			result[key] = obj[key];
		}
	}
	return result;
};

export const pick_by = <T extends Record<K, any>, K extends string | number>(
	obj: T,
	should_pick: (value: any, key: K) => boolean,
): Partial<T> => {
	const result = {} as Partial<T>;
	for (const key in obj) {
		const value = obj[key];
		if (should_pick(value, key as any)) {
			result[key] = value;
		}
	}
	return result;
};

// `omit_undefined` is a commonly used form of `pick_by`
// See this issue for why it's used so much:
// https://github.com/Microsoft/TypeScript/issues/13195
export const omit_undefined = <T extends Record<string | number, any>>(obj: T): T =>
	pick_by(obj, (v) => v !== undefined) as T;

// A more explicit form of `{putThisFirst: obj.putThisFirst, ...obj}`
export const reorder = <T extends Record<K, any>, K extends string | number>(
	obj: T,
	keys: K[],
): T => {
	const result = {} as T;
	for (const k of keys) result[k] = obj[k];
	// overwriting is probably faster than using
	// a `Set` to track what's already been added
	for (const k in obj) result[k] = obj[k];
	return result;
};

/*

This `nulls` thing allows easier destructuring of `null`s from potentially error-causing values:

`const {a, b} = maybeUndestructureable() || nulls;`

If `thing()` returns a non-destructureable value, the `|| nulls` ensures `a` and `b` default to `null`.

*/
export const nulls: {[key: string]: null} = new Proxy(
	{},
	{
		get() {
			return null;
		},
	},
);
// sure:
export const undefineds: {[key: string]: undefined} = new Proxy(
	{},
	{
		get() {
			return undefined;
		},
	},
);

export const EMPTY_OBJECT: Record<string | number | symbol, any> = Object.freeze({}) as any;
