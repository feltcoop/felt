<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
</script>

<Markup>
	<p>Great! We'll never bother you about those things again unless our lawyers make us.</p>
	<p>
		Just checking, you accept all of that stuff, right? Our lawyers are making us ask, you know how
		lawyers are.
	</p>
	<button on:click={() => done()}>I accept →</button>
</Markup>
