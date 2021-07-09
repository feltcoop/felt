<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/ui/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;
</script>

<Markup>
	<p>Here is the privacy policy and terms of service for this sketch:</p>
	<ol>
		<li>this is fake</li>
		<li>we are not collecting any data, big or little</li>
		<li>you will not have an account at the end of all this</li>
	</ol>
</Markup>

<button on:click={() => done()}> <Markup>I accept ✓</Markup> </button>

<style>
	p {
		font-size: var(--font_size_md);
	}
	li {
		font-size: var(--font_size_md);
	}
	ol {
		list-style-position: inside;
	}
</style>
