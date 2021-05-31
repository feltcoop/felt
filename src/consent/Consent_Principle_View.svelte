<script lang="ts">
	import type {Consent_Principle} from './consent';

	// TODO remove/rename the `_View` in `Consent_Principle_View` probably,
	// but how to avoid name clash with interface?

	export let principle: Consent_Principle;
</script>

<h2>{principle.type}</h2>
—
{principle.title}
