<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
</script>

<Markup>
	<p>Great! We'll never bother you about those things again unless our lawyers make us.</p>
	<p>
		Settings are so confusing right! That's why we're hard at work burying them as deep as we can,
		because we put the customer first.
	</p>
	<button on:click={() => done()}>continue →</button>
</Markup>
