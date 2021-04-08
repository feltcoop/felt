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
		// because we're mounted in production at feltcoop.github.io/felt
		paths: {base: process.env.NODE_ENV === 'production' ? '/felt' : ''},

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {}),
			},
		},
	},
};
