<script lang="ts">
	import type {State_Machine, State, Send} from '$lib/xstate/machine';

	export let machine: State_Machine;
	export let state: State;
	export let send: Send;

	$: stateNode = machine.states[$state.value as any];
	// $: console.log('stateNode', stateNode);

	// keyboard controls - TODO refactor
	const on_keydown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowRight') {
			send('NEXT');
		} else if (e.key === 'ArrowLeft') {
			send('PREVIOUS');
		}
	};
</script>

{#each machine.events as event_name (event_name)}
	<button on:click={() => send(event_name)} disabled={!stateNode.handles(event_name)}>
		<slot {event_name}>
			{event_name}
		</slot>
	</button>
{/each}

<!-- TODO make this compose -->
<svelte:window on:keydown={on_keydown} />

<style>
	button {
		text-transform: lowercase;
	}
</style>
