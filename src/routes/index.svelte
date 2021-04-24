<script lang="ts">
	import Icons from '$lib/Icons.svelte';
	import * as iconsByName from '$lib/icons';

	$: icons = Object.entries(iconsByName)
		.map(([name, icon]) => ({name, icon}))
		.sort((a, b) => a.name.localeCompare(b.name));
</script>

<h1>
	here's the <a href="https://github.com/feltcoop/felt-mockup">Felt mockup</a> we made last year. more
	soon
</h1>
<Icons {icons} />
