<script lang="ts">
	import type {Onboard_Send, Onboard_State} from './onboard';
	import Machine_Controls from '../xstate/Machine_Controls.svelte';
	import {onboard_machine} from './onboard';

	export let state: Onboard_State;
	export let send: Onboard_Send;

	// console.log('onboard_machine', onboard_machine);
	$: state_ids = Object.keys(onboard_machine.states);

	// $: console.log('$state.value', $state.value);

	const select = (state_id: string) => {
		const state_id_index = state_ids.indexOf(state_id);
		const old_id_index = state_ids.indexOf($state.value as string);
		const direction = old_id_index > state_id_index ? -1 : 1;
		const event_name = direction > 0 ? 'NEXT' : 'PREVIOUS';
		while ($state.value !== state_id) {
			send(event_name);
		}
	};
</script>

<div>
	<nav class="buttons">
		<Machine_Controls machine={onboard_machine} {state} {send} let:event_name>
			{event_name === 'PREVIOUS' ? '←' : ''}
			{event_name}
			{event_name === 'NEXT' ? '→' : ''}
		</Machine_Controls>
	</nav>
	<nav>
		{#each state_ids as state_id (state_id)}
			<button
				disabled={state_id === $state.value}
				class:selected={state_id === $state.value}
				on:click={() => select(state_id)}>{state_id}</button
			>
		{/each}
	</nav>
</div>

<style>
	.buttons {
		display: flex;
		justify-content: stretch;
		align-items: stretch;
	}
	nav {
		display: flex;
		flex-direction: row;
	}
	button {
		flex: 1;
		width: 100%;
		height: 100%;
	}
</style>
