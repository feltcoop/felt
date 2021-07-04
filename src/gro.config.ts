import type {Gro_Config_Creator, Gro_Config_Partial} from '@feltcoop/gro';

const files = [
	// top level API: `import {...} from '@feltcoop/felt';`
	'lib/index.ts',

	// TODO refactor
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
	'lib/util/timings.ts',
	'lib/util/types.ts',
	'lib/util/uuid.ts',
];

export const config: Gro_Config_Creator = async () => {
	const partial: Gro_Config_Partial = {
		builds: [{name: 'library', platform: 'node', input: files}],
	};
	return partial;
};
