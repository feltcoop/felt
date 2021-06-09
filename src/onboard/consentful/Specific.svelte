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
		tags: string[];
	}

	const spaces: Space[] = [
		{
			name: 'Open Source Web Devs',
			selected: false,
			tags: ['programming', 'example-code', 'javascript', 'front-end', '1000+ users'],
		},
		{
			name: 'Local Developers',
			selected: false,
			tags: ['<1000 users', 'local-politics', 'job-postings', 'dogs', 'beer'],
		},
		{
			name: 'Online Academics',
			selected: false,
			tags: ['flowers', 'animation', 'dance', '1000+ users', 'computer-human-interaction'],
		},
		{
			name: 'Gamer Group',
			selected: false,
			tags: ['indie-dev', 'social', 'off-topic', '<50 users', 'fanart'],
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
	<p>Now it's time to join a place to talk or two!</p>
</Markup>

{#each spaces as space (space.name)}
	<Checkbox
		checked={space.selected}
		on_change={(checked) => toggle_selected(checked, space)}
		--overflow="hidden"
		--font_size="var(--font_size_xl3)"
		--text_align="center"
	>
		<div>
			{space.name}
		</div>
		<ul class="tags">
			{#each space.tags as tag (tag)}
				<li class="tag">
					<Tag name={tag} />
				</li>
			{/each}
		</ul>
	</Checkbox>
{/each}

<button on:click={() => done()}>
	<Markup>
		{#if selected_count}
			join these spaces →
		{:else}
			maybe later →
		{/if}
	</Markup>
</button>

<style>
	.tags {
		flex: 1;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding-left: var(--spacing_rg);
	}
	.tag {
		display: flex;
	}
</style>
