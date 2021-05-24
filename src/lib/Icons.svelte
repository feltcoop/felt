<script lang="ts">
	export let icons: {name: string; icon: string}[];
	$: titleIcon = icons.find((icon) => icon.name === 'felt')!;
</script>

<h1>{titleIcon.icon}Icons{titleIcon.icon}</h1>
<ul>
	{#each icons as {name, icon} (name)}
		<li>{icon} {name}</li>
	{/each}
</ul>

<style>
	ul {
		display: grid;
		grid: auto-flow / repeat(auto-fill, 200px);
		text-align: left;
	}
</style>
