export const sort_map = <T extends Map<any, any>>(
	map: T,
	comparator = compare_simple_map_entries,
): T => new Map([...map].sort(comparator)) as T;

export const compare_simple_map_entries = (a: [any, any], b: [any, any]): number => {
	const a_key = a[0];
	return typeof a_key === 'string' ? a_key.localeCompare(b[0]) : a[0] > b[0] ? 1 : -1;
};
