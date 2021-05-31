<script lang="ts">
	export let checked: boolean;
	export let on_change: ((checked: boolean) => void) | null = null;

	$: on_change && on_change(checked);
</script>

<div class="checkbox buttonlike" class:selected={checked}>
	<label>
		<input type="checkbox" bind:checked />
		<slot />
	</label>
</div>

<style>
	.checkbox {
		width: 100%;
		color: var(--text_color);
		font-size: var(--font_size_md);
		display: flex;
		align-items: center;
		justify-content: center;
		--border_style: double;
		/* TODO wait should this JUST set variables, and buttonlike uses them? yes! */
		border-top: var(--border_width_lg) var(--border_style) var(--border_lighter_color);
		border-bottom: var(--border_width_lg) var(--border_style) var(--border_lighter_color);
	}
	.selected {
		border-color: var(--selected_color);
	}
	.selected:active {
		border-color: var(--border_active_color);
	}
	label {
		width: var(--column_width);
		padding: var(--spacing_md) 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	input {
		width: var(--spacing_xl);
		height: var(--spacing_xl);
		margin-right: var(--spacing_lg);
	}
</style>
