<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;
</script>

<Markup>
	<h1>Here are the terms of use for this sketch:</h1>
	<div>
		<ol>
			<h2><li>this is fake</li></h2>
			<h2><li>we are not collecting big data</li></h2>
			<h2>
				<li>you will not have an account at the end of all this</li>
			</h2>
		</ol>
	</div>
</Markup>

<button on:click={() => done()}> I agree </button>

<style>
	div {
		list-style-position: inside;
	}
</style>
