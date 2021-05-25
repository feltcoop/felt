import type {GroConfigCreator, GroConfigPartial} from '@feltcoop/gro';

export const config: GroConfigCreator = async () => {
	const partial: GroConfigPartial = {
		// by default, Gro bundles libraries, but Felt is published as individual modules
		adapt: async () =>
			(await import('@feltcoop/gro/dist/adapt/gro-adapter-node-library.js')).createAdapter({
				builds: [{name: 'lib', type: 'unbundled'}],
			}),
	};
	return partial;
};
