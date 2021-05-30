<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Content from '$lib/Content.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
</script>

<Content>
	<p>Great! We'll never bother you about those things again unless our lawyers make us.</p>
	<p>
		Settings are so annoying right! We're burying those annoying options as deeply as we can, as we
		speak! Software is hard, ha ha ha.
	</p>
	<button on:click={() => done()}>continue →</button>
</Content>
