<script lang="ts">
	import {arrow_left, arrow_right} from '$lib/icons';

	export let left: boolean;
</script>

<div class="side">
	<div class="indicator">☑</div>
	<div>
		{#if !left}{arrow_left}{/if}
		now do this side
		{#if left}{arrow_right}{/if}
	</div>
</div>

<style>
	.side {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 4;
		height: 100%;
		width: 100%;
		background: var(--tint_overlay);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		color: var(--help_color);
		font-size: var(--font_size_xl2);
	}
	.indicator {
		font-size: var(--font_size_xl7);
	}
</style>
