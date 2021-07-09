<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/ui/Markup.svelte';
	import {arrow_right} from '$lib/ui/icons';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;
</script>

<Markup>
	<h2>Welcome to Felt.dev!</h2>
</Markup>

<blockquote>
	need help? <a
		href="/help"
		on:click|preventDefault={() =>
			alert(
				"We're still working on this, but if you actually want help you can email us at team@felt.social",
			)}>felt.dev/help</a
	>
</blockquote>

<button on:click={() => done()}>
	<Markup>let's get started {arrow_right}</Markup>
</button>
