<script>
	import {page} from '$app/stores';
	import {greenheart} from '$lib/icons';
	import Link_Path from '$lib/Link_Path.svelte';

	import '../app.css';
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

<nav>
	<h1>
		{#if $page.path === '/'}
			<a href="/" class="selected">Felt.dev</a>
		{:else}
			<Link_Path path={$page.path} selected_path={$page.path}>
				<small><a href="/">{greenheart}</a></small>
			</Link_Path>
		{/if}
	</h1>
</nav>
<main>
	<slot />
</main>
<Devmode {devmode} />

<style>
	nav {
		width: 100%;
		min-height: var(--nav_height);
		display: flex;
		justify-content: center;
		flex-shrink: 0;
	}
	main {
		flex: 1;
		width: 100%;
		margin: 0 auto;
	}
	small {
		/* TODO shouldn't be needed if they composed from the parent context, like by using % */
		font-size: var(--font_size_rg);
	}
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: var(--nav_height);
	}
</style>
