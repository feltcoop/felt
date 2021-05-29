<script lang="ts">
	import type {StateMachine, State, Send} from './machine';

	export let machine: StateMachine;
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

{#each machine.events as eventName (eventName)}
	<button on:click={() => send(eventName)} disabled={!stateNode.handles(eventName)}>
		{eventName}
	</button>
{/each}

<svelte:window on:keydown={onKeyDown} />
