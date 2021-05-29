<script lang="ts">
	import type {OnboardSend, OnboardState} from './onboard';

	export let state: OnboardState;
	export let send: OnboardSend;
</script>

<button on:click={() => send('NEXT')}>send 'NEXT'</button>
<button on:click={() => send('PREVIOUS')}>send 'PREVIOUS'</button>
<h2>{$state.value}</h2>
<pre>{JSON.stringify($state, null, 2)}</pre>

<style>
	h2 {
		text-align: center;
	}
</style>
