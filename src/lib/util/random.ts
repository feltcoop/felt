export const random_float = (min: number, max: number): number => Math.random() * (max - min) + min;

export const random_int = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const random_item = <T>(arr: T[]): T => arr[random_int(0, arr.length - 1)];
