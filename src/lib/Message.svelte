<script lang="ts">
	export let text: string | null;
</script>

{#if text}
	<div class="message">
		<div class="text">
			{text}
		</div>
	</div>
{/if}

<style>
	.message {
		min-height: var(--message_min_height);
		width: 100%;
		color: var(--message_color, var(--plain_color));
		font-weight: bold;
		font-size: var(--font_size_md);
		margin: var(--spacing_lg) 0;
		border-top: 2px solid var(--message_color, var(--plain_color));
		border-bottom: 2px solid var(--message_color, var(--plain_color));
		display: flex;
		align-items: stretch;
	}
	.text {
		width: 100%;
		border-top: 2px dashed var(--message_color, var(--plain_color));
		border-bottom: 2px dashed var(--message_color, var(--plain_color));
		padding: var(--spacing_md) 0;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>
