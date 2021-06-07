<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';
	import Checkbox from '$lib/Checkbox.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;

	interface Community {
		id: string;
		selected: boolean;
	}

	const communities: Community[] = [
		{
			id: 'Svelte Social',
			selected: false,
			metatags: ['programming', 'example-code', 'javascript', 'front-end', '1000+ users'],
		},
		{
			id: 'Denver Developers',
			selected: false,
			metatags: ['<1000 users', 'local-politics', 'job-postings', 'dogs', 'beer'],
		},
		{
			id: 'Anne Arbor Academics',
			selected: false,
			metatags: ['flowers', 'animation', 'dance', '1000+ users', 'computer-human-interaction'],
		},
		{
			id: 'Darknet Discussion',
			selected: false,
			metatags: ['unmoderated', 'anonymous', 'crime', 'global-politics', '10000+ users'],
		},
	];

	const toggle_selected = (selected: boolean, community: Community) => {
		community.selected = selected;
	};
</script>

<Markup>
	<p>Now it's time to join a community or two!</p>
</Markup>

{#each communities as community (community.id)}
	<Checkbox
		checked={community.selected}
		on_change={(checked) => toggle_selected(checked, community)}
		--overflow="hidden"
		--font_size="var(--font_size_xl3)"
		--text_align="center"
	>
		{community.id} | {#each community.metatags as metatag (metatag)}
			<small>{metatag}</small> |
		{/each}
	</Checkbox>
{/each}

<button on:click={() => done()}> Let's get to posting!</button>
