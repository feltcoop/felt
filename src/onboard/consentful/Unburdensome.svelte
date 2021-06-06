<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;
</script>

<Markup>
	<h2>welcome to Felt.dev!</h2>
</Markup>

<blockquote>
	need help? <a
		href="/help"
		on:click|preventDefault={() =>
			alert('We're still working on this bit, but please email us at info@felt.social')}>felt.dev/help</a
	>
</blockquote>

<button on:click={() => done()}>
	<Markup>let's go →</Markup>
</button>
