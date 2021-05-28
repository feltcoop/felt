export const noop: (...args: any[]) => void = () => {};

export const identity = <T>(t: T): T => t;

export interface Lazy<T> {
	(): T;
}

export const lazy = <T>(value: T | Lazy<T>): T =>
	typeof value === 'function' ? (value as Function)() : value; // TODO fix type casting
