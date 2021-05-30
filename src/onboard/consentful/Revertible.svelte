<script lang="ts">
	import type {Onboard_Data} from '../onboard';

	export let data: Onboard_Data;
	export let done: () => void;

	const back = () => {
		console.log('TODO');
	};
</script>

<p>
	Are you sure you understand the deal? <a>Click here</a> to test your knowledge.
</p>

<button on:click={() => back()}>← go back</button>
<button on:click={() => done()}>continue →</button>
