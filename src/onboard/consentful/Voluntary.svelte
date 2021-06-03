<script lang="ts">
	import type {Onboard_Data} from '../onboard';

	export let data: Onboard_Data;
	export let done: () => void;

	// TODO validate?

	let username = '';
	let password = '';

	const create = () => {
		console.log('create');
		done();
	};
</script>

<form>
	<input bind:value={username} placeholder="username" />
	<input type="password" bind:value={password} placeholder="password" />
	<button type="button" on:click={create}>create account</button>
</form>
