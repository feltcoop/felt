<script lang="ts">
	export let text: string | null;
	export let icon: string | null = null;
</script>

{#if text}
	<div class="message">
		<div class="wrapper">
			<div class="wrapper2">
				<span>
					{#if icon}
						<span class="icon">{icon}</span>
					{/if}
					<!-- TODO probably make this a slot instead -->
					{text}
				</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.message {
		min-height: var(--message_min_height);
		width: 100%;
		color: var(--message_color, var(--tint));
		font-weight: var(--font_weight, var(--font_weight_4));
		font-size: var(--font_size_md);
		border-width: var(--border_width_md) var(--border_width_xxl);
		border-style: var(--border_style_2);
		border-color: var(--message_color, var(--border_color_lighter));
		display: flex;
		align-items: stretch;
	}
	.icon {
		padding-right: var(--spacing_rg);
	}
	.wrapper {
		width: 100%;
		padding: var(--spacing_md) var(--spacing_sm);
		display: flex;
		border-width: 0 var(--border_width_lg);
		border-style: var(--border_style_2);
		border-color: var(--message_color, var(--border_color_lighter));
	}
	.wrapper2 {
		width: 100%;
		padding: var(--spacing_md) var(--spacing_sm);
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>
