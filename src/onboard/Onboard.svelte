<script lang="ts">
	import {useMachine} from '@xstate/svelte';

	import {principles} from '../consent/consent';
	import type {Consent_Principle_Type} from '../consent/consent';
	import Consent_Principle_View from '../consent/Consent_Principle_View.svelte';
	import {onboard_machine} from './onboard';
	import Nav from './Nav.svelte';
	// import Machine_State from '../xstate/Machine_State.svelte';
	import Onboard_State from './Onboard_State.svelte';

	const onboard = useMachine(onboard_machine);
	// console.log('onboard', onboard);
	const {state, send} = onboard;
	// $: console.log('$state', $state);

	// TODO types
	$: principle =
		($state.value as string) in principles
			? principles[$state.value as Consent_Principle_Type]
			: null;
</script>

<div class="onboard">
	<header>
		{#if principle}
			<Consent_Principle_View {principle} />
		{:else if $state.value === 'begin'}
			<h2>onboard—</h2>
		{:else if $state.value === 'end'}
			<h2>→</h2>
		{/if}
	</header>
	<Nav {state} {send} />
	<div class="content">
		<section class="column">
			<Onboard_State consent_type="unconsentful" {state} {send} />
		</section>
		<section class="column">
			<Onboard_State consent_type="consentful" {state} {send} />
		</section>
	</div>
</div>

<style>
	.onboard {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	header {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing_sm);
	}
	.content {
		height: 100%;
		display: flex;
		justify-content: center;
	}
	section {
		height: 100%;
		flex: 1;
		flex-shrink: 0; /* keep equal size regardless of content */
		padding-top: var(--spacing_lg);
		display: flex;
		flex-direction: column;
		align-items: stretch;
		/* TODO should this be on `.column` ? */
		border-left: var(--border);
		border-right: var(--border);
	}
</style>
