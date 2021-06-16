import {typescript} from 'svelte-preprocess-esbuild';
import staticAdapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: typescript(),
	kit: {
		adapter: staticAdapter(),
		target: '#svelte',
		appDir: 'app', // because the default '_app' is ignored by GitHub pages by default
		files: {assets: 'src/static'},
	},
};
