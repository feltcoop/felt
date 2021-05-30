<script lang="ts">
	import {writable} from 'svelte/store';
	import type {Writable} from 'svelte/store';

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
		selected: boolean;
	}
	const email_contacts: Writable<Contact[]> = writable([
		{id: 'mom', selected: true},
		{id: 'alice', selected: true},
		{id: 'my_dentist', selected: true},
		{id: 'moms_email_from_the_90s', selected: true},
		{id: 'childhood_friend_grandma', selected: true},
		{id: 'noreply_at_every_website', selected: true},
		{id: 'local_supermarket', selected: true},
		{id: 'are_you_serious_?', selected: true},
		{id: 'barry', selected: true},
		{id: 'bank', selected: true},
		{id: 'who', selected: true},
		{id: 'a_spammer_x_1_000_000_000', selected: true},
		{id: 'a_friend_who_i_want_to_share_with', selected: true},
		{id: 'random_person_who_typod_your_address', selected: true}, // TODO reward
		{id: 'that_guy_from_the_thing_last_week', selected: true},
		{id: 'a_dog_on_the_internet', selected: true},
	]);

	$: selected_contacts = $email_contacts.filter((c) => c.selected);
	$: selected_count = selected_contacts.length;

	const toggle_selected = (
		selected: boolean,
		email_contact: Contact,
		email_contacts: Writable<Contact[]>,
	) => {
		console.log(
			'selected, email_contact, $email_contacts',
			selected,
			email_contact,
			$email_contacts,
		);
		// TODO
		// email_contacts.update((contacts) =>
		// 	contacts.map((contact) => (contact === email_contact ? {...contact, selected} : contact)),
		// );
	};
</script>

<Content>
	<p>Let's email everyone you've ever emailed to let them know the good news!</p>
</Content>

<Checkbox bind:checked={consenting}>
	<Content>
		<div>send marketing emails to everyone I've ever emailed</div>
		<div>so they can join the fun!</div>
	</Content>
</Checkbox>

<button on:click={() => done()}>blast those emails to {selected_count} contacts!</button>

{#if consenting}
	<Plain_Message text=":-)" />
{:else}
	<Help_Message text="No worries! We'll email only these contacts:" />
{/if}

<form>
	{#if !consenting}
		{#each $email_contacts as email_contact (email_contact.id)}
			<Checkbox
				checked={email_contact.selected}
				--vertical_padding="0"
				on_change={(checked) => toggle_selected(checked, email_contact, email_contacts)}
			>
				{email_contact.id}
			</Checkbox>
		{/each}
	{/if}
</form>

<style>
	form {
		align-items: stretch;
	}
	p {
		font-size: var(--font_size_md);
	}
</style>
