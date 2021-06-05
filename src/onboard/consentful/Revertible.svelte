<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;

	let understood = false;
</script>

<Markup>
	<p>
		Are you sure you understand the deal? <button disabled title="TODO" class="inline"
			>test my knowledge!</button
		>
	</p>
	<button on:click={() => back()}>← go back and learn</button>
	<blockquote>🌈✨ if you don't know the deal, it's not consentful✨✨</blockquote>
	<button on:click={() => (understood = true)} disabled={understood}>yes I understand →</button>
	{#if understood}
		<p>
			Here's <a href="/deal">a link to the documents</a> for the future, and you can always find
			help in your <a href="/account">account settings</a>
			<button class="inline" on:click={() => done()}>got it →</button>
		</p>
	{/if}
</Markup>
