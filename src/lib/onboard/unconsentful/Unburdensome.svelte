<script lang="ts">
	import type {Onboard_Data} from '$lib/onboard/onboard';
	import Markup from '$lib/ui/Markup.svelte';
	import Checkbox from '$lib/ui/Checkbox.svelte';
	import Help_Message from '$lib/ui/Help_Message.svelte';
	import Message from '$lib/ui/Message.svelte';

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
		{id: 'your ex', selected: true},
		{id: 'your dentist', selected: true},
		{id: 'moms email from the 90s', selected: true},
		{id: 'childhood friend grandma', selected: true},
		{id: 'noreply at every website', selected: true},
		{id: 'local supermarket', selected: true},
		{id: 'your bank', selected: true},
		{id: 'who is this?', selected: true},
		{id: '1000 spammers', selected: true},
		{id: 'a friend with whom you will talk about this app irl', selected: true},
		{id: 'the friend who invited you in the first place', selected: true},
		{id: "random stranger who typo'd your address", selected: true}, // TODO reward
		{id: 'that guy from the thing last week', selected: true},
		{id: 'a dog on the internet', selected: true},
		{id: 'alice', selected: true},
		{id: 'barry', selected: true},
		{id: 'chaz', selected: true},
		{id: 'daniel', selected: true},
		{id: 'are you serious ?', selected: true},
	];

	let selected_contacts = email_contacts.filter((c) => c.selected);
	$: selected_count = selected_contacts.length;

	const toggle_selected = (selected: boolean, email_contact: Contact) => {
		email_contact.selected = selected;
		selected_contacts = email_contacts.filter((c) => c.selected);
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
	--content_empty="'☹'"
	--overflow="hidden"
	--font_size="var(--font_size_xl3)"
>
	<Markup>
		<div>Invite your friends</div>
		<small>and everyone you've ever emailed</small>
		<div>so they can join the fun!</div>
		<small>or click the smiley face to choose who to invite</small>
		<div>We already made an account for them!</div>
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
				on_change={(checked) => toggle_selected(checked, email_contact)}
				--content="'☻'"
				--content_empty="'☹'"
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
		font-size: var(--font_size_xs);
	}
</style>
