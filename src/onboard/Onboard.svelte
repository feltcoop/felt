<script lang="ts">
	import {useMachine} from '@xstate/svelte';

	import OnboardUnconsentful from './unconsentful/OnboardUnconsentful.svelte';
	import OnboardConsentful from './consentful/OnboardConsentful.svelte';
	import {onboardMachine} from './onboard';

	// TODO types - see ./onboard.ts
	const onboard = useMachine(onboardMachine);
	const {state, send} = onboard;
</script>

<div class="onboard">
	<section class="left">
		<button on:click={() => send('NEXT')}>send 'NEXT'</button>
		<button on:click={() => send('PREVIOUS')}>send 'PREVIOUS'</button>
		<h2>{$state.value}</h2>
		<pre>{JSON.stringify($state, null, 2)}</pre>
		<OnboardUnconsentful />
	</section>
	<section class="right">
		<OnboardConsentful />
	</section>
</div>

<style>
	.onboard {
		height: 100%;
		display: flex;
	}
	section {
		height: 100%;
		flex: 1;
		border: 1px solid #ccc;
	}
</style>
