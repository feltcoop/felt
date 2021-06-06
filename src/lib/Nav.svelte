<script lang="ts">
	import {greenheart} from '$lib/icons';
	import {page} from '$app/stores';
	import Link_Path from '$lib/Link_Path.svelte';
</script>

<!-- TODO probably change to ul/li once styles are right -->
<div>
	{#if $page.path === '/'}
		<a href="/" class="selected">Felt.dev</a>
	{:else}
		<Link_Path path={$page.path} selected_path={$page.path}>
			<a href="/">{greenheart}</a>
		</Link_Path>
	{/if}
</div>

<style>
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: var(--nav_height);
		font-size: var(--font_size_rg);
	}
</style>
