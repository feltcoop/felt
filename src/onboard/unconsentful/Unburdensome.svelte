<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Content from '$lib/Content.svelte';
	import Checkbox from '$lib/Checkbox.svelte';
	import Help_Message from '$lib/Help_Message.svelte';
	import Plain_Message from '$lib/Plain_Message.svelte';

	export let data: Onboard_Data;
	export let done: () => void;

	let consenting = true; // :-)

	// TODO extract?
	interface Contact {
		id: string;
		checked: boolean;
	}
	const email_contacts: Contact[] = [
		{id: 'my_dentist', checked: true},
		{id: 'alice', checked: true},
		{id: 'mom', checked: true},
		{id: 'moms_email_from_the_90s', checked: true},
		{id: 'childhood_friend_grandma', checked: true},
		{id: 'local_supermarket', checked: true},
		{id: 'barry', checked: true},
		{id: 'noreply_at_every_website', checked: true},
		{id: 'who', checked: true},
		{id: 'are_you_serious_?', checked: true},
		{id: 'spammer', checked: true},
		{id: 'a_spammer', checked: true},
		{id: 'spam_maker', checked: true},
		{id: 'random_person_who_typod_your_address', checked: true},
		{id: 'that_guy_from_the_thing_last_week', checked: true},
		{id: 'a_dog_on_the_internet', checked: true},
	];
</script>

<Content>
	<p>Let's email everyone you've ever emailed to let them know the good news!</p>
</Content>

<Checkbox bind:checked={consenting}>
	<Content>
		<div>send marketing emails to everyone I've ever emailed</div>
		<div>so they can join in the fun!</div>
	</Content>
</Checkbox>

<button on:click={() => done()}>blast those emails!</button>

{#if consenting}
	<Plain_Message text=":-)" />
{:else}
	<Help_Message text="No worries! We'll only email the following people:" />
{/if}

<form>
	{#if !consenting}
		{#each email_contacts as email_contact (email_contact.id)}
			<Checkbox checked={email_contact.checked} --vertical_padding="0">
				{email_contact.id}
			</Checkbox>
		{/each}
	{/if}
</form>

<style>
	form {
		align-items: stretch;
	}
</style>
