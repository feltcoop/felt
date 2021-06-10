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
		If you change your mind you can delete you account
		<a
			href="/account"
			on:click|preventDefault={() =>
				alert('Thank you for calling support. Please hold until you give up.')}
		>
			by calling support
		</a>.
	</p>
	<button on:click={() => done()}>
		<Markup><span class="button-text" /></Markup>
	</button>
</Markup>

<style>
	.button-text::after {
		content: 'continue →';
	}
	button:hover .button-text::after {
		content: 'do I have a choice?';
	}
</style>
