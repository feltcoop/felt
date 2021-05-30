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
		alert(`todo: navigate to state_id "${state_id}"`);
	};
</script>

<nav>
	<section class="buttons">
		<Machine_Controls machine={onboard_machine} {state} {send} />
	</section>
	<section>
		<ul>
			{#each state_ids as state_id (state_id)}
				<li>
					<button disabled={state_id === $state.value} on:click={() => select(state_id)}
						>{state_id}</button
					>
				</li>
			{/each}
		</ul>
	</section>
</nav>

<style>
	.buttons {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	ul {
		display: flex;
		flex-direction: row;
	}
	li {
		flex: 1;
	}
	button {
		width: 100%;
		height: 100%;
	}
</style>
