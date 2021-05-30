<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Content from '$lib/Content.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
</script>

<Content>
	<p>well this is awkward</p>
	<button on:click={() => done()}>continue</button>
</Content>
