// TODO these probably belong in `./path.ts` but we need to shim Node's `path` for the browser:
// https://www.npmjs.com/package/path-browserify
// until then these are tested in `./path.test.ts`

// Designed for the `cheap-watch` API.
// to_path_parts('./foo/bar/baz.ts') => ['foo', 'foo/bar', 'foo/bar/baz.ts']
export const to_path_parts = (path: string): string[] => {
	const segments = to_path_segments(path);
	let currentPath = path[0] === '/' ? '/' : '';
	return segments.map((segment) => {
		if (currentPath && currentPath !== '/') {
			currentPath += '/';
		}
		currentPath += segment;
		return currentPath;
	});
};

// Gets the individual parts of a path, ignoring dots and separators.
// to_path_segments('/foo/bar/baz.ts') => ['foo', 'bar', 'baz.ts']
export const to_path_segments = (path: string): string[] =>
	path.split('/').filter((s) => s && s !== '.' && s !== '..');
