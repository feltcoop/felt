<script lang="ts">
	import type {Onboard_Send} from './onboard';
	import Markup from '$lib/Markup.svelte';
	import Credits from './Credits.svelte';

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

	<button on:click={() => send('NEXT')}> click here to start → </button>

	<Credits />
</Markup>

<style>
	button {
		font-size: var(--spacing_xl2);
		font-weight: var(--font_weight_2);
		text-align: center;
		color: var(--text_disabled_color);
	}
</style>
