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
		{id: 'BAD NEWS', selected: true},
		{id: 'GOOD NEWS', selected: true},
		{id: 'DOPAMINE DRIP', selected: true},
		{id: 'RAGE FACTORY', selected: true},
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
		{community.id}
	</Checkbox>
{/each}

<button on:click={() => done()}> Let's get to posting...</button>
