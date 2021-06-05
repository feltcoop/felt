<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;
</script>

<Markup>
	<p>
		Are you sure you understand the deal? <button disabled title="TODO" class="inline">
			test my knowledge!
		</button>
	</p>
	<button on:click={() => back()}> ← go back and learn </button>
	<blockquote>🌈✨ if you don't know the deal, it's not consentful✨✨</blockquote>
	<button on:click={() => done()}> yes I understand → </button>
</Markup>
