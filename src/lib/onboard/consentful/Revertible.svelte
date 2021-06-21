<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';
	import {arrow_left, arrow_right} from '$lib/icons';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;

	let understood = false;
</script>

<Markup>
	<p>
		Before we create your (fake) account, are you sure you understand the deal?
		<!-- TODO maybe have this button quiz the user? -->
		<!-- <button
			disabled
			title="TODO"
			class="inline"
		>
			test my knowledge!
		</button> -->
	</p>
	<button on:click={() => back()}> <Markup>{arrow_left} go back and learn</Markup> </button>
	<blockquote>🌈✨ if you don't know the deal, it's not consentful✨✨</blockquote>
	<button on:click={() => (understood = true)} disabled={understood}>
		<Markup>yes I understand {arrow_right}</Markup>
	</button>
	{#if understood}
		<p>
			Here's <a
				href="/deal"
				on:click|preventDefault={() => alert('TODO -- thank you for being interested!')}
				>a link to the documents</a
			>
			for the future, and you can always find help in your
			<a
				href="/account"
				on:click|preventDefault={() => alert('TODO -- thank you for being interested!')}
				>account settings</a
			>.
		</p>
		<button on:click={() => done()}> create my account {arrow_right} </button>
	{/if}
</Markup>
