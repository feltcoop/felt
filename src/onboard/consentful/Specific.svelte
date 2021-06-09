<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';
	import Checkbox from '$lib/Checkbox.svelte';
	import Tag from '$lib/Tag.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;

	interface Space {
		name: string;
		selected: boolean;
		summary: string;
	}

	const spaces: Space[] = [
		{
			name: 'announcements',
			selected: false,
			summary: 'the Felt team posts updates here once or twice a month',
		},
		{
			name: 'tool design',
			selected: false,
			summary: 'anyone who uses Felt may be interested in its design',
		},
		{
			name: 'technical webdev',
			selected: false,
			summary: 'for web programmers making apps, bots, games, and other coding projects',
		},
		{
			name: 'community governance',
			selected: false,
			summary: 'for people who want to work with other people to make better decisions and systems',
		},
	];

	let selected_spaces = spaces.filter((c) => c.selected);
	$: selected_count = selected_spaces.length;

	const toggle_selected = (selected: boolean, space: Space) => {
		space.selected = selected;
		selected_spaces = spaces.filter((c) => c.selected);
	};
</script>

<Markup>
	<p>Felt.dev has a few spaces for various interests. Want to join some now?</p>
</Markup>

{#each spaces as space (space.name)}
	<Checkbox checked={space.selected} on_change={(checked) => toggle_selected(checked, space)}>
		<Markup>
			<!-- TODO what semantic element? I think h2/h3 is wrong -->
			<div class="name">
				{space.name}
			</div>
			<p class="summary">
				{space.summary}
			</p>
		</Markup>
	</Checkbox>
{/each}

<button on:click={() => done()}>
	<Markup>
		{#if selected_count}
			join these communites →
		{:else}
			maybe later →
		{/if}
	</Markup>
</button>

<style>
	.name {
		font-size: var(--font_size_lg);
	}
	.summary {
		font-size: var(--font_size_rg);
	}
</style>
