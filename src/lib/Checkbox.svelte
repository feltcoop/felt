<script lang="ts">
	export let checked: boolean;
	export let on_change: ((checked: boolean) => void) | null = null;

	$: on_change && on_change(checked);
</script>

<div class="checkbox" class:checked>
	<label>
		<input type="checkbox" bind:checked />
		<slot />
	</label>
</div>

<style>
	/* TODO review `custom_border_color` pattern below */
	.checkbox {
		width: 100%;
		color: var(--text_color);
		font-size: var(--font_size_md);
		display: flex;
		align-items: stretch;
		justify-content: flex-start;
	}
	label {
		border-top: var(--border_width_md) var(--border_style)
			var(--custom_border_color, var(--border_lighter_color));
		border-bottom: var(--border_width_md) var(--border_style)
			var(--custom_border_color, var(--border_lighter_color));
		width: 100%;
		padding: var(--spacing_md) 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	label:hover {
		outline: var(--spacing_rg) var(--border_accent_style) var(--interactive_hover_color);
	}
	.checked {
		--custom_border_color: var(--selected_color);
	}
	.checkbox:active,
	.checked:active {
		--custom_border_color: var(--border_active_color);
	}
	input {
		width: var(--spacing_xl);
		height: var(--spacing_xl);
		margin-right: var(--spacing_lg);
	}
</style>
