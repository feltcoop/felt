<script lang="ts">
	import {useMachine} from '@xstate/svelte';

	import {onboard_machine} from './onboard';
	import Nav from './Nav.svelte';
	// import Machine_State from '../xstate/Machine_State.svelte';
	import Onboard_State from './Onboard_State.svelte';

	// TODO types - see ./onboard.ts
	const onboard = useMachine(onboard_machine);
	// console.log('onboard', onboard);
	const {state, send} = onboard;
	// $: console.log('$state', $state);
</script>

<div class="onboard">
	<Nav {state} {send} />
	<div class="content">
		<!-- TODO add a dev mode or smth <section>
			<Machine_State {state} />
		</section> -->
		<section>
			<Onboard_State consent_type="unconsentful" {state} {send} />
		</section>
		<section>
			<Onboard_State consent_type="consentful" {state} {send} />
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
		padding-top: var(--spacing_lg);
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	section:first-child {
		border-right: 1px solid var(--plain_color);
	}
	section:nth-child(2) {
		border-left: 1px solid var(--plain_color);
	}
</style>
