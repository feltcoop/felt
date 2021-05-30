<script lang="ts">
	import type {State_Machine, State, Send} from './machine';

	export let machine: State_Machine;
	export let state: State;
	export let send: Send;

	$: stateNode = machine.states[$state.value as any];
	// $: console.log('stateNode', stateNode);

	// keyboard controls - TODO refactor
	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowRight') {
			send('NEXT');
		} else if (e.key === 'ArrowLeft') {
			send('PREVIOUS');
		}
	};
</script>

{#each machine.events as event_name (event_name)}
	<button on:click={() => send(event_name)} disabled={!stateNode.handles(event_name)}>
		{event_name === 'PREVIOUS' ? '←' : ''}{event_name}{event_name === 'NEXT' ? '→' : ''}
	</button>
{/each}

<!-- TODO make this compose -->
<svelte:window on:keydown={onKeyDown} />

<style>
	button {
		text-transform: lowercase;
	}
</style>
