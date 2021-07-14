<script>
	import '$lib/ui/style.css';
	import {set_devmode} from '$lib/ui/devmode';
	import Devmode from '$lib/ui/Devmode.svelte';
	import Nav from '$lib/ui/Nav.svelte';

	const devmode = set_devmode(false);
</script>

<svelte:head>
	<link rel="shortcut icon" href="/favicon.png" />
</svelte:head>

<nav>
	<Nav />
</nav>
<main>
	<slot />
</main>
<Devmode {devmode} />

<style>
	nav {
		font-size: var(--font_size_lg);
	}
	main {
		flex: 1;
		width: 100%;
		margin: 0 auto;
	}
</style>
