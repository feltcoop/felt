<script lang="ts">
	import {useMachine} from '@xstate/svelte';

	import {consent_principles} from '$lib/consent/consent';
	import type {Consent_Type, Consent_Principle_Type} from '$lib/consent/consent';
	import Consent_Principle_Summary from '$lib/consent/Consent_Principle_Summary.svelte';
	import {onboard_machine, onboard_data, save_state} from '$lib/onboard/onboard';
	import type {Onboard_State_Name} from '$lib/onboard/onboard';
	import Nav from '$lib/onboard/Nav.svelte';
	import Begin from '$lib/onboard/Begin.svelte';
	import End from '$lib/onboard/End.svelte';
	import Side_Complete from '$lib/onboard/Side_Complete.svelte';
	// import Machine_State from '$lib/xstate/Machine_State.svelte';

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
			if (!done_unconsentful) return;
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
	$: save_state($state.value as any); // TODO type -- also TODO better pattern?

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
			<Consent_Principle_Summary {principle} />
		{:else}
			&nbsp;
		{/if}
	</header>
	<Nav {state} {send} />
	<div class="content">
		{#if $state.value === 'begin'}
			<Begin {send} />
		{:else if $state.value === 'end'}
			<End />
		{:else if unconsentful_data.component && consentful_data.component}
			<section class="column">
				<svelte:component
					this={unconsentful_data.component}
					data={unconsentful_data}
					done={() => done('unconsentful')}
					{back}
				/>
				{#if done_unconsentful}
					<Side_Complete left={true} />
				{/if}
			</section>
			<section class="column">
				<svelte:component
					this={consentful_data.component}
					data={consentful_data}
					done={() => done('consentful')}
					{back}
				/>
				{#if done_consentful}
					<Side_Complete left={false} />
				{/if}
			</section>
		{:else}
			error: unexpected `null` components
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
</style>
