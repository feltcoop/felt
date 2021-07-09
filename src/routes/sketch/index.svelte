<script lang="ts">
	import Markup from '$lib/ui/Markup.svelte';
	import {to_sketch_id} from '$lib/sketch/sketch';
	import type {Sketch} from '$lib/sketch/sketch';

	const sketches: Sketch[] = ['onboard'].map((name) => ({name, id: to_sketch_id(name)}));
</script>

<nav>
	<ol>
		{#each sketches as sketch (sketch.name)}
			<Markup>
				<li>
					<a href={sketch.id}>{sketch.name}</a>
				</li>
			</Markup>
		{/each}
	</ol>
</nav>

<style>
	li {
		font-size: var(--font_size_xl2);
	}
</style>
