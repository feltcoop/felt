<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Content from '$lib/Content.svelte';
	import Credits from '../Credits.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
</script>

<Content>
	<h1>welcome to the end.</h1>
	<ul>
		<li>voluntary</li>
		<li>informed</li>
		<li>revertible</li>
		<li>specific</li>
		<li>unburdensome</li>
	</ul>
	<Credits />
</Content>
