<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Error_Message from '$lib/Error_Message.svelte';
	import Help_Message from '$lib/Help_Message.svelte';
	import Plain_Message from '$lib/Plain_Message.svelte';

	import {UnreachableError} from '../../utils/error';

	export let data: Onboard_Data;
	export let done: (data: Onboard_Data, provider: Service_Provider_Data) => void;

	let create_error_message: string | null = null;
	let signup_error_message: string | null = null;
	let signup_helper_message: string | null = null;

	type Service_Provider = '$SOCIAL' | '$TRACKER' | '$TRUSTED';
	interface Service_Provider_Data {
		id: Service_Provider;
	}
	const providers: Record<Service_Provider, Service_Provider_Data> = {
		$SOCIAL: {id: '$SOCIAL'},
		$TRACKER: {id: '$TRACKER'},
		$TRUSTED: {id: '$TRUSTED'},
	};
	const provider_list = Object.values(providers);
	let selected_provider: Service_Provider_Data | null = null;

	const create = (username: string, _password: string) => {
		selected_provider = null;
		create_error_message = `We apologize for the inconvenience${
			username ? `, ${username}` : ''
		}! Our systems are acting up. Please click one of the buttons below. :-)`;
	};
	const signup_with = (provider: Service_Provider_Data) => {
		console.log('signup_with name', provider, data);
		switch (provider.id) {
			case '$SOCIAL': {
				selected_provider = providers.$SOCIAL;
				signup_error_message = '';
				signup_helper_message = `Great! Let's sign you up with $TRACKER!`;
				break;
			}
			case '$TRACKER': {
				selected_provider = providers.$TRACKER;
				signup_error_message = '';
				signup_helper_message = `Great! Let's sign you up with $SOCIAL!`;
				break;
			}
			case '$TRUSTED': {
				selected_provider = providers.$TRUSTED;
				signup_error_message = '404 not found :-)';
				break;
			}
			default:
				throw new UnreachableError(provider.id);
		}
	};

	const signup = (data: Onboard_Data, provider: Service_Provider_Data | null) => {
		console.log('signup data, provider', data, provider);
		if (provider) done(data, provider);
	};

	const handle_keydown_create = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			create(username, password);
		}
	};

	let username = '';
	let password = '';
	let phone_number = '';
	let home_address = '';
	let anything_else = '';
	let consenting = true; // :-)

	$: enable_signup_button = consenting && phone_number && home_address && anything_else;
</script>

<form>
	<input bind:value={username} placeholder="username" on:keydown={handle_keydown_create} />
	<input bind:value={password} placeholder="password" on:keydown={handle_keydown_create} />
	<button
		type="button"
		on:click={() => create(username, password)}
		disabled={!!create_error_message}>create account</button
	>

	<div class="message" style="--message_min_height: 80px;">
		{#if !selected_provider}
			<Error_Message text={create_error_message} />
		{:else if create_error_message}
			<Plain_Message text=":-)" />
		{/if}
		{#if !create_error_message}
			<Plain_Message text="or" />
		{/if}
	</div>

	{#each provider_list as provider (provider.id)}
		<button
			type="button"
			on:click={() => signup_with(provider)}
			disabled={!!selected_provider && selected_provider === provider}
		>
			signup with {provider.id}</button
		>
	{/each}

	{#if selected_provider === providers.$SOCIAL || selected_provider === providers.$TRACKER}
		{#if selected_provider && selected_provider !== providers.$TRUSTED}
			<Help_Message text={signup_helper_message} />
			<input bind:value={phone_number} placeholder="phone number" />
			<input bind:value={home_address} placeholder="home address" />
			<input bind:value={anything_else} placeholder="anything else you would like to share? :-)" />
			<button
				type="button"
				on:click={() => signup(data, selected_provider)}
				disabled={!enable_signup_button}
			>
				call me to finish signup with {selected_provider === providers.$SOCIAL
					? providers.$TRACKER.id
					: providers.$SOCIAL.id}
			</button>
			<label>
				<input type="checkbox" bind:checked={consenting} />
				I consent to everything I did/did not read and/or understand</label
			>
		{/if}
	{:else if selected_provider}
		<Error_Message text={signup_error_message} />
	{/if}
</form>

<style>
	.message {
		width: 100%;
	}
</style>
