<script lang="ts">
	import type {OnboardSend, OnboardState, OnboardStateName, ConsentType} from './onboard';
	import {onboardData} from './onboard';

	export let consentType: ConsentType;
	export let state: OnboardState;
	export let send: OnboardSend;

	$: data = onboardData[consentType][$state.value as OnboardStateName]; // TODO fix type in ../onboard.ts

	const done = () => {};
</script>

<svelte:component this={data.component} {done} />
