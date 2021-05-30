<script lang="ts">
	import type {Onboard_Data} from '../onboard';

	export let data: Onboard_Data;
	export let done: () => void;

	let consenting = true; // :-)
</script>

<label>
	<input type="checkbox" bind:checked={consenting} />
	I consent to everything I did/did not read and/or understand</label
>
