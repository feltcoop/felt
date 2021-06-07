export const truncate = (str: string, max_length: number, suffix = '...'): string => {
	if (max_length < suffix.length) return '';
	if (str.length > max_length) {
		return str.substring(0, max_length - suffix.length) + suffix;
	}
	return str;
};

// removes characters inclusive of `stripped`
export const strip_start = (source: string, stripped: string): string => {
	if (!stripped || !source.startsWith(stripped)) return source;
	return source.substring(stripped.length);
};

// removes characters inclusive of `stripped`
export const strip_end = (source: string, stripped: string): string => {
	if (!stripped || !source.endsWith(stripped)) return source;
	return source.substring(0, source.length - stripped.length);
};

// removes characters inclusive of `stripped`
export const strip_after = (source: string, stripped: string): string => {
	if (!stripped) return source;
	const idx = source.indexOf(stripped);
	if (idx === -1) return source;
	return source.substring(0, idx);
};

// removes characters inclusive of `stripped`
export const strip_before = (source: string, stripped: string): string => {
	if (!stripped) return source;
	const idx = source.indexOf(stripped);
	if (idx === -1) return source;
	return source.substring(idx + stripped.length);
};

export const ensure_start = (source: string, ensured: string): string => {
	if (source.startsWith(ensured)) return source;
	return ensured + source;
};

export const ensure_end = (source: string, ensured: string): string => {
	if (source.endsWith(ensured)) return source;
	return source + ensured;
};

// also trims trailing space
export const deindent = (str: string): string =>
	str
		.split('\n')
		.filter(Boolean)
		.map((s) => s.trim())
		.join('\n');

export const plural = (count: number | undefined | null, suffix = 's'): string =>
	count === 1 ? '' : suffix;
