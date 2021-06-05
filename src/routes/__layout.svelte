<script>
	import {page} from '$app/stores';
	import Link_Path from '$lib/Link_Path.svelte';

	import '../app.css';
	import Nav from '$lib/Nav.svelte';
	import {provide_devmode} from '$lib/devmode';
	import Devmode from '$lib/Devmode.svelte';

	$: path = $page.path;

	const devmode = provide_devmode(false);
	$: if (path === '/sketch/onboard') {
		$devmode = true;
	}
</script>

<svelte:head>
	<link rel="shortcut icon" href="favicon.png" />
</svelte:head>

<div class="nav">
	<Nav />
</div>
<div class="nav">
	<h1>
		<Link_Path path={$page.path} />
	</h1>
</div>
<main>
	<slot />
</main>
<Devmode {devmode} />

<style>
	.nav {
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
