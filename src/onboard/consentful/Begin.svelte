<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Content from '$lib/Content.svelte';
	import Credits from '../Credits.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
</script>

<Content>
	<p>welcome.</p>
	<Credits />
</Content>
