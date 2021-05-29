<script lang="ts">
	import type {Send} from './machine';

	export let events: string[]; // TODO maybe change API to accept $state ?
	export let send: Send;
</script>

{#each events as eventName (eventName)}
	<button on:click={() => send(eventName)}>{eventName}</button>
{/each}
