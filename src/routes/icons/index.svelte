<script lang="ts">
	import Icons from '$lib/Icons.svelte';
	import * as icons_by_name from '$lib/icons';

	$: icons = Object.entries(icons_by_name)
		.map(([name, icon]) => ({name, icon}))
		.sort((a, b) => a.name.localeCompare(b.name));
</script>

<Icons {icons} />
