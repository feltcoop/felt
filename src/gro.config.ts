import type {GroConfigCreator, GroConfigPartial} from '@feltcoop/gro';

const files = [
	// top level API: `import {...} from '@feltcoop/felt';`
	'index.ts',

	// deep imports available to external consumers
	'utils/array.ts',
	'utils/async.ts',
	'utils/env.ts',
	'utils/equal.ts',
	'utils/error.ts',
	'utils/function.ts',
	'utils/json.ts',
	'utils/lock.ts',
	'utils/log.ts',
	'utils/map.ts',
	'utils/math.ts',
	'utils/object.ts',
	'utils/obtainable.ts',
	'utils/path.ts',
	'utils/print.ts',
	'utils/process.ts',
	'utils/random.ts',
	'utils/string.ts',
	'utils/terminal.ts',
	'utils/time.ts',
	'utils/uuid.ts',
];

export const config: GroConfigCreator = async () => {
	const partial: GroConfigPartial = {
		builds: [{name: 'library', platform: 'node', input: files}],
		adapt: async () => [
			// TODO
			(await import('@feltcoop/gro/dist/adapt/gro-adapter-sveltekit-frontend.js')).createAdapter(),
			// (await import('@feltcoop/gro/dist/adapt/gro-adapter-node-library.js')).createAdapter(),
		],
	};
	return partial;
};
