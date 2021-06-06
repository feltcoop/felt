<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';
	import Checkbox from '$lib/Checkbox.svelte';
	import Help_Message from '$lib/Help_Message.svelte';
	import Message from '$lib/Message.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;

	let consenting = true; // :-)

	// TODO extract?
	interface Contact {
		id: string;
		selected: boolean;
	}
	const email_contacts: Contact[] = [
		{id: 'mom', selected: true},
		{id: 'alice', selected: true},
		{id: 'my dentist', selected: true},
		{id: 'moms email from the 90s', selected: true},
		{id: 'childhood friend grandma', selected: true},
		{id: 'noreply at every website', selected: true},
		{id: 'local supermarket', selected: true},
		{id: 'are you serious ?', selected: true},
		{id: 'barry', selected: true},
		{id: 'bank', selected: true},
		{id: 'who', selected: true},
		{id: '1000 spammers', selected: true},
		{id: 'a friend with whom i will word of mouth irl', selected: true},
		{id: "random stranger who typo'd my address", selected: true}, // TODO reward
		{id: 'that guy from the thing last week', selected: true},
		{id: 'a dog on the internet', selected: true},
	];

	$: selected_contacts = email_contacts.filter((c) => c.selected);
	$: selected_count = selected_contacts.length;

	const toggle_selected = (
		selected: boolean,
		email_contact: Contact,
		email_contacts: Contact[],
	) => {
		console.log('selected, email_contact, email_contacts', selected, email_contact, email_contacts);
		// TODO wontfix? lol
		// email_contacts.update((contacts) =>
		// 	contacts.map((contact) => (contact === email_contact ? {...contact, selected} : contact)),
		// );
	};

	const blast_emails = () => {
		done();
	};
</script>

<Markup>
	<p>You're almost there!</p>
	<p>Let's spread the good news:</p>
</Markup>

<Checkbox
	bind:checked={consenting}
	--content="'☻'"
	--overflow="hidden"
	--font_size="var(--font_size_xl3)"
>
	<Markup>
		<div>Send marketing emails to</div>
		<small>everyone I've ever emailed</small>
		<div>so they can join the fun!</div>
	</Markup>
</Checkbox>

<button on:click={() => blast_emails()}>
	<Markup>
		email blast {selected_count} contacts!
	</Markup>
</button>

{#if consenting}
	<Message text=":-)" />
{:else}
	<Help_Message text="No worries! We'll email only these contacts:" />
{/if}

<form>
	{#if !consenting}
		{#each email_contacts as email_contact (email_contact.id)}
			<Checkbox
				checked={email_contact.selected}
				on_change={(checked) => toggle_selected(checked, email_contact, email_contacts)}
				--content="'☻'"
				--overflow="hidden"
				--font_size="var(--font_size_xl3)"
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
	small {
		font-size: var(--font_size_sm);
	}
</style>
