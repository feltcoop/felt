<script lang="ts">
	import {page} from '$app/stores';

	const path_infos = [
		{path: '/', content: 'home'},
		// TODO add this back when we're ready to publish
		// {path: '/onboard', content: 'onboard'},
		{path: '/icons', content: 'icons'},
	];

	$: path = $page.path;
</script>

<nav>
	{#each path_infos as path_info (path_info)}
		<a class:selected={path === path_info.path} href={path_info.path}>{path_info.content}</a>
	{/each}
</nav>

<style>
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10px;
	}
</style>
