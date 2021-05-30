<script lang="ts">
	import type {Onboard_Data} from '../onboard';

	export let data: Onboard_Data;
	export let done: () => void;
</script>

<div>→</div>

<style>
	div {
		font-size: var(--spacing_xxxxxl);
		text-align: center;
		color: var(--text_disabled_color);
	}
</style>
