<script lang="ts">
	export let path: string;

	// TODO track active status

	const to_parts = (path: string): string[] => path.split('/').filter(Boolean);

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
		const parts = to_parts(raw_path);
		const last_part = parts[parts.length - 1];
		let path = '';
		for (const part of parts) {
			if (path) path += '/';
			path += part;
			segments.push({type: 'space', name: part, path});
			if (part !== last_part) {
				segments.push({type: 'spacer', path});
			}
		}
		segments_cache.set(raw_path, segments);
		return segments;
	};

	$: segments = to_segments(path);
</script>

<div class="path">
	{#each segments as segment}
		{#if segment.type === 'space'}
			<a href={segment.path}>{segment.name}</a>
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
