<script lang="ts">
	import Icons from '$lib/Icons.svelte';
	import * as iconsByName from '$lib/icons';

	$: icons = Object.entries(iconsByName)
		.map(([name, icon]) => ({name, icon}))
		.sort((a, b) => a.name.localeCompare(b.name));
</script>

<main>
	<Icons {icons} />

	<p>Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	p {
		max-width: 14rem;
		margin: 2rem auto;
		line-height: 1.35;
	}

	@media (min-width: 480px) {
		p {
			max-width: none;
		}
	}
</style>
