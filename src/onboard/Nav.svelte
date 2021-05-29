<script lang="ts">
	import type {OnboardSend, OnboardState} from './onboard';
	import MachineControls from '../xstate/MachineControls.svelte';

	export let state: OnboardState;
	export let send: OnboardSend;
</script>

<nav>
	<section class="buttons">
		<MachineControls events={['NEXT', 'PREVIOUS']} {send} />
	</section>
	<h2>{$state.value}</h2>
	<pre>{JSON.stringify($state, null, 2)}</pre>
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
