<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Content from '$lib/Content.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;
</script>

<Content>
	<p>
		Are you sure you understand the deal? <button on:click={() => confirm('TODO')}
			>test my knowledge</button
		>
	</p>
	<button on:click={() => back()}>← go back and learn</button>
	<button on:click={() => done()}>yes I understand →</button>
	<blockquote>🌈✨ if you don't know the deal, it's not consentful✨✨✨</blockquote>
</Content>
