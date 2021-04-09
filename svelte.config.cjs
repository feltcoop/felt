const {typescript} = require('svelte-preprocess-esbuild');
const staticAdapter = require('@sveltejs/adapter-static');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: typescript(),
	kit: {
		adapter: staticAdapter(),

		// because the default '_app' is ignored by GitHub pages by default
		appDir: 'app',

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {}),
			},
		},
	},
};
