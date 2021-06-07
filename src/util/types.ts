/*

These are convenient global types that can be used in both Felt and user code.
It probably makes more sense to give this file a `.d.ts` extension,
but that complicates the build because TypeScript does not output them.

TODO probably make this `.d.ts` when we make a proper build process

*/

export type Falsy = false | '' | null | undefined | 0 | -0 | typeof NaN;

export type Omit_Strict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// these were thrown together quickly - is there a better way to do this?
// there are probably better names for them!
// see `Required`, `Exclude` and `Extract` for possible leads for improvements
export type Partial_Except<T, K extends keyof T> = {[P in K]: T[P]} &
	{[P in Exclude<keyof T, K>]?: T[P]};
export type Partial_Only<T, K extends keyof T> = {[P in K]?: T[P]} &
	{[P in Exclude<keyof T, K>]: T[P]};

export type Partial_Values<T> = {
	[P in keyof T]: Partial<T[P]>;
};

export type Assignable<T, K extends keyof T = keyof T> = {
	-readonly [P in K]: T[P];
};

export type Defined<T> = T extends undefined ? never : T;
export type Not_Null<T> = T extends null ? never : T;

export type Result<T_Value = {}, T_Error = {}> = ({ok: true} & T_Value) | ({ok: false} & T_Error);
// A helper that says,
// "hey I know this is wrapped in a `Result`, but I expect it to be `ok`,
// so if it's not, I understand it will throw an error"
export const unwrap = <
	T_Value extends {value: T_Wrapped_Value},
	T_Wrapped_Value,
	T_Error extends {reason?: string}
>(
	result: Result<T_Value, T_Error>,
): T_Wrapped_Value => {
	if (result.ok) {
		return result.value;
	} else {
		throw Error(result.reason || 'Failed to unwrap result with unknown reason');
	}
};

/*

The `Flavored` and `Branded` type helpers add varying degrees of nominal typing to other types.
This is especially useful with primitives like strings and numbers.

```ts
type PhoneNumber = Branded<string, 'PhoneNumber'>;
const phone1: PhoneNumber = 'foo'; // error!
const phone2: PhoneNumber = 'foo' as PhoneNumber; // ok
```

`Flavored` is a looser form of `Branded` that trades safety for ergonomics.
With `Flavored` you don't need to cast unflavored types:

```ts
type Email = Flavored<string, 'Email'>;
const email1: Email = 'foo'; // ok
type Address = Flavored<string, 'Address'>;
const email2: Email = 'foo' as Address; // error!
```

*/
export type Branded<T_Value, TName> = T_Value & Brand<TName>;
export type Flavored<T_Value, TName> = T_Value & Flavor<TName>;
declare const Branded_Symbol: unique symbol;
declare const Flavored_Symbol: unique symbol;
export interface Brand<T> {
	readonly [Branded_Symbol]: T;
}
export interface Flavor<T> {
	readonly [Flavored_Symbol]?: T;
}
