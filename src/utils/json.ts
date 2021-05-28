export type Json = string | number | boolean | null | {[prop: string]: Json} | Json[];

export type JsonType = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

export const getJsonType = (value: Json): JsonType => {
	const valueType = typeof value;
	switch (valueType) {
		case 'string':
		case 'number':
		case 'boolean':
			return valueType;
		case 'object': {
			if (value === null) {
				return 'null';
			} else if (Array.isArray(value)) {
				return 'array';
			} else {
				return 'object';
			}
		}
		default: {
			// "undefined" | "function" | "bigint" | "symbol"
			throw Error(`Invalid json value type "${valueType}": ${value}`);
		}
	}
};
