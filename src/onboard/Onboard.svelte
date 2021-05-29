<script lang="ts">
	import {useMachine} from '@xstate/svelte';

	import {onboardMachine} from './onboard';
	import Nav from './Nav.svelte';
	// import MachineState from '../xstate/MachineState.svelte';
	import OnboardState from './OnboardState.svelte';

	// TODO types - see ./onboard.ts
	const onboard = useMachine(onboardMachine);
	console.log('onboard', onboard);
	const {state, send} = onboard;
	$: console.log('$state', $state);
</script>

<div class="onboard">
	<Nav {state} {send} />
	<div class="content">
		<!-- TODO add a dev mode or smth <section>
			<MachineState {state} />
		</section> -->
		<section>
			<OnboardState consentType="unconsentful" {state} {send} />
		</section>
		<section>
			<OnboardState consentType="consentful" {state} {send} />
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
