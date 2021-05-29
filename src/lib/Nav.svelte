<script lang="ts">
	import {page} from '$app/stores';

	const pathInfos = [
		{path: '/', content: 'home'},
		// TODO add this back when we're ready to publish
		// {path: '/onboard', content: 'onboard'},
		{path: '/icons', content: 'icons'},
	];

	$: path = $page.path;
</script>

<nav>
	{#each pathInfos as pathInfo (pathInfo)}
		<a class:active={path === pathInfo.path} href={pathInfo.path}>{pathInfo.content}</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		justify-content: stretch;
	}
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		padding: 0 10px;
	}
	a:hover,
	.active {
		text-decoration: underline;
	}
	.active {
		opacity: 1;
		color: var(--text_color);
	}
</style>
