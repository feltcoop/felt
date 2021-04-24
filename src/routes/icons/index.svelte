<script lang="ts">
	import Icons from '$lib/Icons.svelte';
	import * as iconsByName from '$lib/icons';

	$: icons = Object.entries(iconsByName)
		.map(([name, icon]) => ({name, icon}))
		.sort((a, b) => a.name.localeCompare(b.name));
</script>

<Icons {icons} />
