<script lang="ts">
	import type {OnboardData} from '../onboard';

	export let data: OnboardData;
	export let done: () => void;

	const create = (username: string, password: string) => {
		console.log('create', username);
		password;
	};
	const logInWith = (name: string) => {
		console.log('logInWith name', name);
	};

	let username = '';
	let password = '';
</script>

<h1>unconsentful : voluntary</h1>

<form>
	<input bind:value={username} placeholder="username" />
	<input bind:value={password} placeholder="password" />
	<button type="button" on:click={() => create(username, password)}>create account</button>

	<div class="or">or</div>

	<button type="button" on:click={() => logInWith('$SOCIAL')}> log in with $SOCIAL</button>
	<button type="button" on:click={() => logInWith('$TRACKER')}> log in with $TRACKER</button>
	<button type="button" on:click={() => logInWith('$TRUSTED')}> log in with $TRUSTED</button>
</form>

<style>
	.or {
		/* TODO vars  */
		border-top: 2px dashed #ccc;
		border-bottom: 2px dashed #ccc;
		margin: 20px 0;
		padding: 10px 0;
		font-size: 32px;
		width: 100%;
		text-align: center;
	}
</style>
