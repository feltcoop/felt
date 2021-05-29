<script lang="ts">
	import type {Onboard_Data} from '../onboard';

	export let data: Onboard_Data;
	export let done: (data: Onboard_Data) => void;

	let username = '';
	let password = '';

	const create = () => {
		console.log('create');
	};
</script>

<h1>consentful</h1>

<form>
	<input bind:value={username} placeholder="username" />
	<input bind:value={password} placeholder="password" />
	<button type="button" on:click={create}>create account</button>
</form>
