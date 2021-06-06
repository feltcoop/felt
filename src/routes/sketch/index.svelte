<script lang="ts">
	import Markup from '$lib/Markup.svelte';
	import type {Sketch} from '../../sketch/sketch';

	const sketches: Sketch[] = [{name: 'onboard'}];
</script>

<nav>
	<ol>
		{#each sketches as sketch (sketch.name)}
			<Markup>
				<li>
					<h2>
						<a href="/sketch/{sketch.name}">{sketch.name}</a>
					</h2>
				</li>
			</Markup>
		{/each}
	</ol>
</nav>
