<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';
	import {provide_devmode} from '$lib/devmode';
	import Devmode from '$lib/Devmode.svelte';

	const devmode = provide_devmode(true);
</script>

<svelte:head>
	<link rel="shortcut icon" href="favicon.png" />
</svelte:head>

<div id="nav"><Nav /></div>
<main>
	<slot />
</main>
<Devmode {devmode} />

<style>
	#nav {
		width: 100%;
		height: var(--nav_height);
		display: flex;
		justify-content: center;
		flex-shrink: 0;
	}
	main {
		flex: 1;
		width: 100%;
		margin: 0 auto;
	}
</style>
