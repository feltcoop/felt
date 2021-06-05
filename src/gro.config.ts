import type {GroConfigCreator, GroConfigPartial} from '@feltcoop/gro';

const files = [
	// top level API: `import {...} from '@feltcoop/felt';`
	'index.ts',

	// deep imports available to external consumers
	'util/array.ts',
	'util/async.ts',
	'util/env.ts',
	'util/equal.ts',
	'util/error.ts',
	'util/function.ts',
	'util/json.ts',
	'util/lock.ts',
	'util/log.ts',
	'util/map.ts',
	'util/math.ts',
	'util/object.ts',
	'util/obtainable.ts',
	'util/path.ts',
	'util/print.ts',
	'util/process.ts',
	'util/random.ts',
	'util/string.ts',
	'util/terminal.ts',
	'util/time.ts',
	'util/uuid.ts',
];

export const config: GroConfigCreator = async () => {
	const partial: GroConfigPartial = {
		builds: [{name: 'library', platform: 'node', input: files}],
		adapt: async () => [
			// TODO this is bugged in Gro, could be hackfixed with a simple in-between adapter but w/e
			(await import('@feltcoop/gro/dist/adapt/gro-adapter-sveltekit-frontend.js')).createAdapter(),
			// (await import('@feltcoop/gro/dist/adapt/gro-adapter-node-library.js')).createAdapter(),
		],
	};
	return partial;
};
