<script lang="ts">
	import type {Onboard_Data} from '../onboard';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;

	let username = '';
	let password = '';
</script>

<form>
	<input bind:value={username} placeholder="username" />
	<input type="password" bind:value={password} placeholder="password" />
	<button type="button" on:click={() => done()}> create account </button>
</form>
