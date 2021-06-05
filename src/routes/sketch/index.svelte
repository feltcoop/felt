<script lang="ts">
	import type {Sketch} from '../../sketch/sketch';

	const sketches: Sketch[] = [{name: 'onboard'}];
</script>

<nav>
	{#each sketches as sketch (sketch.name)}
		<a href={sketch.name}>{sketch.name}</a>
	{/each}
</nav>
