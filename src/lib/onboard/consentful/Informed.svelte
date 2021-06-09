<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;
</script>

<Markup>
	<h1>Here are the terms of use and privacy policy for this sketch:</h1>
	<ol>
		<li>this is fake</li>
		<li>we are not collecting any data, big or little</li>
		<li>you will not have an account at the end of all this</li>
	</ol>
</Markup>

<button on:click={() => done()}> I accept ✓ </button>

<style>
	li {
		font-size: var(--font_size_lg);
	}
	ol {
		list-style-position: inside;
	}
</style>
