<script lang="ts">
	import type {Consent_Principle} from '$lib/consent/consent';

	export let principle: Consent_Principle;
</script>

{principle.type}: {principle.summary}
