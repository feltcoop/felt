<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Content from '$lib/Content.svelte';

	export let data: Onboard_Data;
	export let done: () => void;

	const back = () => {
		console.log('TODO');
	};
</script>

<Content>
	<p>
		Are you sure you understand the deal? <a>Click here</a> to test your knowledge.
	</p>
	<button on:click={() => back()}>← go back and learn</button>
	<button on:click={() => done()}>yes I understand →</button>
</Content>
