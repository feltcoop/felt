<script lang="ts">
	export let checked: boolean;
	export let on_change: ((checked: boolean) => void) | null = null;

	$: on_change && on_change(checked);
</script>

<div class="checkbox" class:checked>
	<div class="wrapper" class:checked>
		<label>
			<input type="checkbox" bind:checked />
			<slot />
		</label>
	</div>
</div>

<style>
	.checkbox {
		width: 100%;
		color: var(--text_color);
		font-size: var(--font_size_md);
		padding: var(--vertical_padding, --spacing_lg) 0;
		display: flex;
		align-items: stretch;
	}
	.wrapper {
		width: 100%;
		border-top: var(--border_width) var(--border_style) var(--text_color);
		border-bottom: var(--border_width) var(--border_style) var(--text_color);
		display: flex;
		align-items: stretch;
	}
	label {
		width: 100%;
		border-top: var(--border_accent_width) var(--border_accent_style) var(--text_color);
		border-bottom: var(--border_accent_width) var(--border_accent_style) var(--text_color);
		padding: var(--spacing_md) 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.checked,
	.checked label {
		border-top-color: var(--selected_color);
		border-bottom-color: var(--selected_color);
	}
	input {
		width: var(--spacing_xl);
		height: var(--spacing_xl);
		margin-right: var(--spacing_lg);
	}
</style>
