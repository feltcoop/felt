<script lang="ts">
	import type {Onboard_Data} from '../onboard';

	export let data: Onboard_Data;
	export let done: () => void;

	let username = '';
	let password = '';

	const create = () => {
		console.log('create');
		done();
	};
</script>

TODO validate

<form>
	<input bind:value={username} placeholder="username" />
	<input bind:value={password} placeholder="password" />
	<button type="button" on:click={create}>create account</button>
</form>
