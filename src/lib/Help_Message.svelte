<script lang="ts">
	export let text: string | null;
</script>

<!-- TODO refactor/rethink, see others -->
{#if text}
	<div class="text">
		{text}
	</div>
{/if}

<style>
	.text {
		min-height: var(--message_min_height);
		width: 100%;
		/* TODO vars */
		color: green;
		font-weight: bold;
		font-size: var(--font_size_md);
		margin: var(--spacing_lg) 0;
		padding: var(--spacing_md) 0;
		border-top: var(--border_help);
		border-bottom: var(--border_help);
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>
