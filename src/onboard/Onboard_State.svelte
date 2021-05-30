<script lang="ts">
	import type {Onboard_Send, Onboard_State, Onboard_State_Name} from './onboard';
	import type {Consent_Type} from '../consent/consent';
	import {onboard_data} from './onboard';

	export let consent_type: Consent_Type;
	export let state: Onboard_State;
	export let send: Onboard_Send;

	$: data = onboard_data[consent_type][$state.value as Onboard_State_Name]; // TODO fix type in ../onboard.ts

	const done = () => {
		send('NEXT');
	};
	const back = () => {
		send('PREVIOUS');
	};
</script>

<svelte:component this={data.component} {data} {done} {back} />
