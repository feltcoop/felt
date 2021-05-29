<script lang="ts">
	import type {OnboardData} from '../onboard';

	export let data: OnboardData;
	export let done: () => void;

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
