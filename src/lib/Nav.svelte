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
		<a class:selected={path === pathInfo.path} href={pathInfo.path}>{pathInfo.content}</a>
	{/each}
</nav>

<style>
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10px;
	}
	.selected {
		opacity: 1;
		color: var(--text_color);
	}
</style>
