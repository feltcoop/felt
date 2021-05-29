<script lang="ts">
	import type {OnboardData, OnboardSend, OnboardState} from '../onboard';

	export let state: OnboardState;
	export let send: OnboardSend | null = null;
	export let data: OnboardData;
</script>

<h1>
	consentful {data.id}: {$state.value}
</h1>
