<script lang="ts">
	import {greenheart} from '$lib/icons';
	import {page} from '$app/stores';
	import Link_Path from '$lib/Link_Path.svelte';
</script>

<h1>
	{#if $page.path === '/'}
		<a href="/" class="selected">Felt.dev</a>
	{:else}
		<Link_Path path={$page.path} selected_path={$page.path}>
			<small><a href="/">{greenheart}</a></small>
		</Link_Path>
	{/if}
</h1>

<style>
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
