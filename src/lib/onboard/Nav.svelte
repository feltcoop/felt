<script lang="ts">
	import type {Onboard_Send, Onboard_State} from '$lib/onboard/onboard';
	import Machine_Controls from '$lib/xstate/Machine_Controls.svelte';
	import {onboard_machine} from '$lib/onboard/onboard';
	import {get_devmode} from '$lib/ui/devmode';
	import {arrow_left, arrow_right} from '$lib/ui/icons';

	export let state: Onboard_State;
	export let send: Onboard_Send;

	const devmode = get_devmode();

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
	{#if $devmode}
		<nav class="buttons">
			<Machine_Controls machine={onboard_machine} {state} {send} let:event_name>
				{event_name === 'PREVIOUS' ? arrow_left : ''}
				{event_name}
				{event_name === 'NEXT' ? arrow_right : ''}
			</Machine_Controls>
		</nav>
	{/if}
	<nav>
		{#each state_ids as state_id (state_id)}
			<button
				disabled={!$devmode || state_id === $state.value}
				class:selected={state_id === $state.value}
				on:click={$devmode ? () => select(state_id) : undefined}
			>
				{state_id}
			</button>
		{/each}
	</nav>
</div>

<style>
	.buttons {
		display: flex;
		justify-content: stretch;
		align-items: stretch;
	}
</style>
