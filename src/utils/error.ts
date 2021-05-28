export class UnreachableError extends Error {
	constructor(value: never, message = `Unreachable case: ${value}`) {
		super(message);
	}
}

// The builtin `ErrorConstructor` type doesn't work for some use cases
// because it's also callable as a plain function,
// and error classes that inherit from `Error` are not.
export type ErrorClass = {
	new (message?: string): Error;
	readonly prototype: Error;
};
