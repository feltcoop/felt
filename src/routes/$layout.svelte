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
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: var(--nav_height);
		display: flex;
		justify-content: center;
	}
	main {
		height: 100%;
		padding-top: var(--nav_height);
		text-align: center;
		margin: 0 auto;
	}
</style>
