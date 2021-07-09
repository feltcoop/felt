<script lang="ts">
	export let name: string;
</script>

<span>
	{name}
</span>

<style>
	span {
		margin: var(--spacing_xs3);
		padding: 0 var(--spacing_rg);
		background-color: var(--tint_highlight);
		white-space: nowrap;
		border-radius: var(--border_radius_md);
	}
</style>
