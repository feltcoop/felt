<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';
	import Credits from './Credits.svelte';

	export let send: Onboard_Send;
</script>

<Markup>
	<h1>Welcome to the Felt consentful systems onboarding sketch!</h1>
	<p>This sketch is a proof of concept, side-by-side comparsion between two onboarding flows.</p>
	<p>The left column uses dark patterns of design that create an unconsentful experience.</p>
	<p>
		The one on the right uses the consentful design framework laid out by
		<a href="https://consentful.systems">consentful.systems</a>
	</p>
	<p>
		The goal here is to compare and contrast the two design patterns & highlight effective patterns
		of consent.
	</p>

	<button on:click={() => send('NEXT')}>Click here to start →</button>

	<Credits />
</Markup>

<style>
	button {
		font-size: var(--spacing_xxl);
		text-align: center;
		color: var(--text_disabled_color);
	}
</style>
