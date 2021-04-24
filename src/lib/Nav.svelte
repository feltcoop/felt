<script lang="ts">
	import {page} from '$app/stores';

	const pathInfos = [
		{path: '/', content: 'home'},
		{path: '/onboard', content: 'onboard'},
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
	a {
		text-decoration: none;
		padding: 0 10px;
	}
	.active {
		text-decoration: underline;
	}
</style>
