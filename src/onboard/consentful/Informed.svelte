<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
</script>

<Markup>
	<p>well this is awkward</p>
</Markup>
<button on:click={() => done()}>todo --></button>
