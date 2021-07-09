<script lang="ts">
	import {greenheart} from '$lib/ui/icons';
	import {page} from '$app/stores';
	import Link_Path from '$lib/ui/Link_Path.svelte';
</script>

<!-- TODO probably change to ul/li once styles are right -->
<Link_Path path={$page.path} selected_path={$page.path}>
	{#if $page.path === '/'}
		<a href="/" class="selected">Felt.dev</a>
	{:else}
		<a href="/" class="heart">{greenheart}</a>
	{/if}
</Link_Path>

<style>
	.heart {
		min-width: var(--nav_height);
		font-size: var(--font_size_rg);
	}
</style>
