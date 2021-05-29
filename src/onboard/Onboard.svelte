<script lang="ts">
	import {useMachine} from '@xstate/svelte';

	import OnboardUnconsentful from './unconsentful/OnboardUnconsentful.svelte';
	import OnboardConsentful from './consentful/OnboardConsentful.svelte';
	import {onboardMachine} from './onboard';
	import Nav from './Nav.svelte';

	// TODO types - see ./onboard.ts
	const onboard = useMachine(onboardMachine);
	const {state, send} = onboard;
</script>

<div class="onboard">
	<Nav {state} {send} />
	<div class="content">
		<section class="left">
			<OnboardUnconsentful />
		</section>
		<section class="right">
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
