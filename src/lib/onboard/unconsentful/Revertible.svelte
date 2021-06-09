<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;
</script>

<Markup>
	<blockquote>
		👍 Great! We'll never bother you about those things again unless our lawyers make us.
	</blockquote>
	<p>
		Just checking, you accept all of that stuff, right? Our lawyers are making us ask, you know how
		lawyers are 🙄
	</p>
	<button on:click={() => done()} />
</Markup>

<style>
	button::after {
		content: 'I accept →';
	}
	button:hover::after {
		content: 'What choice do I have?';
	}
</style>
