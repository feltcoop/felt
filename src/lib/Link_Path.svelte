<script lang="ts">
	import {to_path_segments} from '../util/path_parsing';

	export let path: string;
	export let selected_path: string | null = null;

	// TODO track active status

	type Segment =
		| {
				type: 'space';
				path: string;
				name: string;
		  }
		| {
				type: 'spacer';
				path: string;
		  };
	const segments_cache = new Map<string, Segment[]>();
	const to_segments = (raw_path: string): Segment[] => {
		// TODO normalize path?
		if (segments_cache.has(raw_path)) {
			return segments_cache.get(raw_path)!;
		}
		let segments: Segment[] = [];
		const path_segments = to_path_segments(raw_path);
		const last_part = path_segments[path_segments.length - 1];
		let path = '';
		for (const path_segment of path_segments) {
			path += '/';
			path += path_segment;
			segments.push({type: 'space', name: path_segment, path});
			if (path_segment !== last_part) {
				segments.push({type: 'spacer', path});
			}
		}
		segments_cache.set(raw_path, segments);
		return segments;
	};

	$: segments = to_segments(path);
</script>

<div class="path">
	<slot />
	{#each segments as segment}
		{#if segment.type === 'space'}
			<a href={segment.path} class:selected={segment.path === selected_path}>{segment.name}</a>
		{:else}
			<div class="separator">/</div>
		{/if}
	{/each}
</div>

<style>
	.path {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	a {
		z-index: 1;
		padding-right: var(--spacing_sm);
		padding-left: var(--spacing_sm);
	}
	.separator {
		z-index: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 0;
	}
</style>
