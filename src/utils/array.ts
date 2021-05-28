export const EMPTY_ARRAY: any[] = Object.freeze([]) as any;

export const last = <T>(array: T[]): T | undefined => array[array.length - 1];

export const toArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);
