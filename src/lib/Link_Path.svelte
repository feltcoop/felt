<script lang="ts">
	export let path: string;

	// TODO
	const to_parts = (path: string): string => path.split('/');

	type Segment_Type = 'space' | 'spacer';
	interface Segment {
		type: Segment_Type;
		content: string;
	}
	const segments_cache = new Map<string, Segment[]>();
	const to_segments = (path: string): Segment[] => {
		// TODO normalize path?
		if (segments_cache.has(path)) return segments_cache.get(path)!;
		// ..
		let segments: Segment[] = [];
		for (const part of to_parts(path)) {
		}
	};

	$: segments = to_segments(path);
</script>

{#each segments as segment (segment)}
	<a href="segment">{segment}</a>
{/each}
