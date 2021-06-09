import type {GroConfigCreator, GroConfigPartial} from '@feltcoop/gro';

const files = [
	// top level API: `import {...} from '@feltcoop/felt';`
	'index.ts',

	// deep imports available to external consumers
	'lib/util/array.ts',
	'lib/util/async.ts',
	'lib/util/env.ts',
	'lib/util/equal.ts',
	'lib/util/error.ts',
	'lib/util/function.ts',
	'lib/util/json.ts',
	'lib/util/lock.ts',
	'lib/util/log.ts',
	'lib/util/map.ts',
	'lib/util/math.ts',
	'lib/util/object.ts',
	'lib/util/obtainable.ts',
	'lib/util/path.ts',
	'lib/util/path_parsing.ts',
	'lib/util/print.ts',
	'lib/util/process.ts',
	'lib/util/random.ts',
	'lib/util/string.ts',
	'lib/util/terminal.ts',
	'lib/util/time.ts',
	'lib/util/uuid.ts',
];

export const config: GroConfigCreator = async () => {
	const partial: GroConfigPartial = {
		builds: [{name: 'library', platform: 'node', input: files}],
		adapt: async () => [
			// TODO this is bugged in Gro, could be hackfixed with a simple in-between adapter but w/e --
			// for now to publish Felt to npm, these two lines need to be swapped
			(await import('@feltcoop/gro/dist/adapt/gro-adapter-sveltekit-frontend.js')).createAdapter(),
			// (await import('@feltcoop/gro/dist/adapt/gro-adapter-node-library.js')).createAdapter(),
		],
	};
	return partial;
};
