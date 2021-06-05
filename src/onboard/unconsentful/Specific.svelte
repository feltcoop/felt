<script lang="ts">
	import type {Onboard_Data} from '../onboard';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;
</script>

<button on:click={() => back()}> ← </button>
