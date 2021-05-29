<script lang="ts">
	import {useMachine} from '@xstate/svelte';

	import OnboardUnconsentful from './unconsentful/OnboardUnconsentful.svelte';
	import OnboardConsentful from './consentful/OnboardConsentful.svelte';
	import {onboardMachine} from './onboard';
	import Nav from './Nav.svelte';

	// TODO types - see ./onboard.ts
	const onboard = useMachine(onboardMachine);
	console.log('onboard', onboard);
	const {state, send} = onboard;
	$: console.log('$state', $state);
</script>

<div class="onboard">
	<Nav {state} {send} />
	<div class="content">
		<section>
			<pre>{JSON.stringify($state, null, 2)}</pre>
		</section>
		<section>
			<OnboardUnconsentful />
		</section>
		<section>
			<OnboardConsentful />
		</section>
	</div>
</div>

<style>
	.onboard {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.content {
		height: 100%;
		display: flex;
	}
	section {
		height: 100%;
		flex: 1;
		border: 1px solid #ccc;
	}
</style>
