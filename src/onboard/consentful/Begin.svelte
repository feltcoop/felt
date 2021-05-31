<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';
	import Credits from '../Credits.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
</script>

<Markup>
	<h1>welcome.</h1>
	<Credits />
</Markup>
