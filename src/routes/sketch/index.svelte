<script lang="ts">
	import Markup from '$lib/Markup.svelte';
	import {to_sketch_id} from '../../sketch/sketch';
	import type {Sketch} from '../../sketch/sketch';

	const sketches: Sketch[] = ['onboard'].map((name) => ({name, id: to_sketch_id(name)}));
</script>

<nav>
	<ol>
		{#each sketches as sketch (sketch.name)}
			<Markup>
				<li>
					<h2>
						<a href={sketch.id}>{sketch.name}</a>
					</h2>
				</li>
			</Markup>
		{/each}
	</ol>
</nav>
