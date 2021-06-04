<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Error_Message from '$lib/Error_Message.svelte';
	import Help_Message from '$lib/Help_Message.svelte';
	import Message from '$lib/Message.svelte';
	import Markup from '$lib/Markup.svelte';

	import {UnreachableError} from '../../utils/error';

	// TODO refactor to an xstate machine

	export let data: Onboard_Data;
	export let done: () => void;

	let create_error_message: string | null = null;
	let signup_error_message: string | null = null;
	let signup_helper_message: string | null = null;

	// TODO extract to `src/providers` or `src/services` or something?
	type Service_Provider = 'SOCIAL_CO' | 'TRACKER_CO' | 'TRUSTED_CO';
	interface Service_Provider_Data {
		id: Service_Provider;
	}
	const providers: Record<Service_Provider, Service_Provider_Data> = {
		SOCIAL_CO: {id: 'SOCIAL_CO'},
		TRACKER_CO: {id: 'TRACKER_CO'},
		TRUSTED_CO: {id: 'TRUSTED_CO'},
	};
	const provider_list = Object.values(providers);
	let selected_provider: Service_Provider_Data | null = null;

	const create = (username: string, _password: string) => {
		selected_provider = null;
		create_error_message = `Whoopsies, our robots can be so clumsy! Sorry${
			username ? `, ${username}` : ''
		}! Systems're broken. Please click the buttons below. :-)`;
	};
	const signup_with = (provider: Service_Provider_Data) => {
		console.log('signup_with name', provider, data);
		switch (provider.id) {
			case 'TRACKER_CO': {
				selected_provider = providers.TRACKER_CO;
				signup_error_message = '';
				signup_helper_message = `Great! Let's sign you up with ${providers.TRACKER_CO.id}`;
				break;
			}
			case 'SOCIAL_CO': {
				selected_provider = providers.SOCIAL_CO;
				signup_error_message = '';
				signup_helper_message = `Great! Let's sign you up with ${providers.TRACKER_CO.id}`;
				break;
			}
			case 'TRUSTED_CO': {
				selected_provider = providers.TRUSTED_CO;
				signup_error_message = '404 not found :-)';
				break;
			}
			default:
				throw new UnreachableError(provider.id);
		}
	};

	const signup = (data: Onboard_Data, provider: Service_Provider_Data | null) => {
		console.log('signup data, provider', data, provider);
		if (provider) done();
	};

	const handle_keydown_create = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			create(username, password);
		}
	};

	let username = '';
	let password = '';
	let phone_number = '';
	let phone_number_el: HTMLInputElement;
	let home_address = '';
	let home_address_el: HTMLInputElement;
	let anything_else = '';
	let anything_else_el: HTMLInputElement;

	$: enable_create_button = !create_error_message;
	$: enable_signup_button = phone_number && home_address && anything_else;
</script>

<form>
	<input
		bind:value={username}
		placeholder="username"
		on:keydown={handle_keydown_create}
		disabled={!enable_create_button}
	/>
	<input
		type="password"
		bind:value={password}
		placeholder="password"
		on:keydown={handle_keydown_create}
		disabled={!enable_create_button}
	/>
	<button type="button" on:click={() => create(username, password)} disabled={!enable_create_button}
		>create account</button
	>

	<div class="message" style="--message_min_height: 100px;">
		{#if !selected_provider}
			<Error_Message text={create_error_message} />
		{:else if create_error_message}
			<Message text=":-)" />
		{/if}
		{#if !create_error_message}
			<Message text="or ↷" />
		{/if}
	</div>

	{#each provider_list as provider (provider.id)}
		<button
			type="button"
			on:click={() => signup_with(provider)}
			disabled={!!selected_provider && selected_provider === provider}
			class:selected={!!selected_provider && selected_provider === provider}
		>
			{#if provider.id === 'TRUSTED_CO'}
				signup with {provider.id}
			{:else}
				<Markup>
					signup with {provider.id}
				</Markup>
			{/if}
		</button>
	{/each}

	{#if selected_provider === providers.SOCIAL_CO || selected_provider === providers.TRACKER_CO}
		{#if selected_provider && selected_provider !== providers.TRUSTED_CO}
			<Help_Message text={signup_helper_message} />
			<input
				bind:value={phone_number}
				bind:this={phone_number_el}
				placeholder="your phone number"
				on:keydown={(e) => {
					if (e.key === 'Enter') home_address_el.focus();
				}}
			/>
			<input
				bind:value={home_address}
				bind:this={home_address_el}
				placeholder="your home address"
				on:keydown={(e) => {
					if (e.key === 'Enter') anything_else_el.focus();
				}}
			/>
			<input
				bind:value={anything_else}
				bind:this={anything_else_el}
				placeholder="anything else you would like to share? :-)"
				on:keydown={(e) => {
					if (enable_signup_button) {
						signup(data, selected_provider);
					} else if (e.key === 'Enter') {
						phone_number_el.focus();
					}
				}}
			/>
			<button
				type="button"
				on:click={() => signup(data, selected_provider)}
				disabled={!enable_signup_button}
				>call my phone<br />
				to finish signup<br />with {providers.TRACKER_CO.id}
			</button>
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
