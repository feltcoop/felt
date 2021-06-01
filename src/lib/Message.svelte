<script lang="ts">
	export let text: string | null;
	export let icon: string | null = null;
</script>

{#if text}
	<div class="message">
		<div class="text">
			<span>
				{#if icon}
					<span class="icon">{icon}</span>
				{/if}
				{text}
			</span>
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
		border-width: var(--border_width_md) var(--border_width_xxxl);
		border-style: var(--border_accent_style);
		border-color: var(--message_color, var(--border_lighter_color));
		display: flex;
		align-items: stretch;
	}
	.icon {
		padding-right: var(--spacing_rg);
	}
	.text {
		width: 100%;
		padding: var(--spacing_md) var(--spacing_sm);
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>
