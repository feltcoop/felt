<script lang="ts">
	import {useMachine} from '@xstate/svelte';

	import {consent_principles} from '../consent/consent';
	import type {Consent_Type, Consent_Principle_Type} from '../consent/consent';
	import Link_Path from '$lib/Link_Path.svelte';
	import Consent_Principle_View from '../consent/Consent_Principle_View.svelte';
	import {onboard_machine, onboard_data} from './onboard';
	import type {Onboard_State_Name} from './onboard';
	import Nav from './Nav.svelte';
	import Begin from './Begin.svelte';
	// import Machine_State from '../xstate/Machine_State.svelte';

	const onboard = useMachine(onboard_machine);
	// console.log('onboard', onboard);
	const {state, send} = onboard;
	// $: console.log('$state', $state);

	// TODO types
	$: principle =
		($state.value as string) in consent_principles
			? consent_principles[$state.value as Consent_Principle_Type]
			: null;

	// TODO move to an xstate machine, somehow
	let done_consentful = false;
	let done_unconsentful = false;

	const done = (consent_type: Consent_Type) => {
		if (consent_type === 'consentful') {
			done_consentful = true;
			if (!done_unconsentful && $state.value !== 'specific') return; // TODO remove hack when 'specific' has content
		} else {
			done_unconsentful = true;
			if (!done_consentful) return;
		}
		send('NEXT');
	};
	const back = () => {
		send('PREVIOUS');
	};

	$: update_state($state);

	// reset the local state -- TODO move to xstate
	const update_state = (_state: typeof $state) => {
		done_consentful = false;
		done_unconsentful = false;
	};

	$: consentful_data = onboard_data.consentful[$state.value as Onboard_State_Name]; // TODO fix type in ../onboard.ts
	$: unconsentful_data = onboard_data.unconsentful[$state.value as Onboard_State_Name]; // TODO fix type in ../onboard.ts
</script>

<div class="onboard">
	<header>
		{#if principle}
			<Consent_Principle_View {principle} />
		{:else}
			<h2>
				<Link_Path path="sketch/onboard" />
			</h2>
		{/if}
	</header>
	<Nav {state} {send} />
	<div class="content">
		{#if $state.value === 'begin'}
			<Begin {send} />
		{:else}
			<section class="column" class:complete={done_unconsentful}>
				<svelte:component
					this={unconsentful_data.component}
					data={unconsentful_data}
					done={() => done('unconsentful')}
					{back}
				/>
			</section>
			<section class="column" class:complete={done_consentful}>
				<svelte:component
					this={consentful_data.component}
					data={consentful_data}
					done={() => done('consentful')}
					{back}
				/>
			</section>
		{/if}
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
		position: relative;
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
	.complete::before {
		z-index: 10;
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		background: var(--tint_overlay);
		content: '';
	}
	.complete::after {
		z-index: 10;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		color: var(--help_color);
		font-size: var(--font_size_xl7);
		text-align: center;
		content: '☑';
	}
</style>
