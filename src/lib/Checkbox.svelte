<script context="module" lang="ts">
	// TODO extract helper
	let id_count = 0;
	const to_id = (): string => `Checkbox_${id_count++}`;
</script>

<script lang="ts">
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
		border-top: var(--border_width_lg) var(--border_style) var(--border_lighter_color);
		border-bottom: var(--border_width_lg) var(--border_style) var(--border_lighter_color);
		--outline_style: var(--border4_style);
		--outline_width: var(--border_width_sm);
	}
	.content {
		width: var(--column_width);
		padding: var(--spacing_md) 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	input {
		margin: 0 var(--spacing_lg);
	}
</style>
