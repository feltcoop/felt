export type Json = string | number | boolean | null | {[prop: string]: Json} | Json[];

export type Json_Type = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

export const get_json_type = (value: Json): Json_Type => {
	const value_type = typeof value;
	switch (value_type) {
		case 'string':
		case 'number':
		case 'boolean':
			return value_type;
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
			throw Error(`Invalid json value type "${value_type}": ${value}`);
		}
	}
};
