<script>
	import {page} from '$app/stores';

	import '../app.css';
	import {provide_devmode} from '$lib/devmode';
	import Devmode from '$lib/Devmode.svelte';
	import Nav from '$lib/Nav.svelte';

	$: path = $page.path;

	const devmode = provide_devmode(false);
	$: if (path === '/sketch/onboard') {
		$devmode = true;
	}
</script>

<svelte:head>
	<link rel="shortcut icon" href="favicon.png" />
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
