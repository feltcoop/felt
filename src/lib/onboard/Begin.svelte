<script lang="ts">
	import type {Onboard_Send} from '$lib/onboard/onboard';
	import Markup from '$lib/ui/Markup.svelte';
	import Credits from '$lib/onboard/Credits.svelte';
	import {arrow_right} from '$lib/ui/icons';

	export let send: Onboard_Send;
</script>

<Markup>
	<h1>
		Welcome to the <a href="/">Felt.dev</a> consentful systems onboarding sketch!
	</h1>
	<p>This sketch is a proof of concept, side-by-side comparsion between two onboarding flows:</p>
	<ul>
		<li>The left column uses dark design patterns that create an unconsentful experience.</li>
		<li>
			The one on the right uses the affirmative consent design framework described by
			<a href="https://consentful.systems">consentful.systems</a>
		</li>
	</ul>
	<p>
		The goal here is to compare and contrast the two design patterns. During the experience, ask
		yourself: which would you prefer?
	</p>

	<button on:click={() => send('NEXT')}> click here to start {arrow_right} </button>

	<Credits />
</Markup>

<style>
	button {
		font-size: var(--spacing_xl2);
		font-weight: var(--font_weight_2);
		text-align: center;
		color: var(--text_color_disabled);
	}
</style>
