<script context="module" lang="ts">
	// TODO extract helper
	let id_count = 0;
	const to_id = (): string => `Checkbox_${id_count++}`;
</script>

<script lang="ts">
	// TODO rethink this API, probably use events instead
	export let checked: boolean;
	export let on_change: ((checked: boolean) => void) | null = null;

	const id = to_id();

	$: on_change && on_change(checked);
</script>

<label class="checkbox buttonlike" class:selected={checked} for={id}>
	<div class="content">
		<input {id} type="checkbox" bind:checked />
		<slot />
	</div>
</label>

<style>
	label {
		width: 100%;
		color: var(--text_color);
		font-size: var(--font_size_md);
		display: flex;
		align-items: center;
		justify-content: center;
		border-width: var(--input_border_width);
		border-style: var(--input_border_style);
		border-color: var(--input_border_color);
		border-left-width: 0;
		border-right-width: 0;
	}
	.content {
		width: var(--column_width);
		padding: var(--spacing_md) 0;
		display: flex;
		align-items: center;
	}
	input {
		margin: 0 var(--spacing_lg);
	}
</style>
