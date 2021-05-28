export const sortMap = <T extends Map<any, any>>(map: T, comparator = compareSimpleMapEntries): T =>
	new Map([...map].sort(comparator)) as T;

export const compareSimpleMapEntries = (a: [any, any], b: [any, any]): number => {
	const aKey = a[0];
	return typeof aKey === 'string' ? aKey.localeCompare(b[0]) : a[0] > b[0] ? 1 : -1;
};
