<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';
	import Checkbox from '$lib/Checkbox.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;

	interface Space {
		name: string;
		selected: boolean;
	}

	const spaces: Space[] = [
		{name: 'GOOD NEWS', selected: true},
		{name: 'BAD NEWS', selected: true},
		{name: 'DOPAMINE DRIP', selected: true},
		{name: 'RAGE FACTORY', selected: true},
	];

	const toggle_selected = (selected: boolean, space: Space) => {
		space.selected = selected;
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
		{space.name}
	</Checkbox>
{/each}

<button on:click={() => done()}>
	<Markup>Let's get to posting...</Markup>
</button>
