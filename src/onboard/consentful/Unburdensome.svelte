<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;
</script>

<Markup>
	<h2>Felt.dev is more fun with people to talk to!</h2>
</Markup>

<blockquote>
	Send this link to people to invite them to join: <a>http://felt.dev/onboard/invite</a>
</blockquote>

<button on:click={() => done()}>
	<Markup>No thanks, let's move on →</Markup>
</button>
