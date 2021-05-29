<script lang="ts">
	import type {OnboardSend, OnboardState} from './onboard';
	import MachineControls from '../xstate/MachineControls.svelte';
	import {onboardMachine} from './onboard';

	export let state: OnboardState;
	export let send: OnboardSend;
</script>

<nav>
	<section class="buttons">
		<MachineControls machine={onboardMachine} {state} {send} />
	</section>
	<h2>{$state.value}</h2>
</nav>

<style>
	h2 {
		text-align: center;
	}
	.buttons {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
</style>
