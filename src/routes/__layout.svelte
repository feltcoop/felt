<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';
</script>

<svelte:head>
	<link rel="shortcut icon" href="favicon.png" />
</svelte:head>

<div id="nav"><Nav /></div>
<main>
	<slot />
</main>

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
