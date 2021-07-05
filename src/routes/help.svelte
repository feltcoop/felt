<script lang="ts">
	import Help_Message from '$lib/Help_Message.svelte';
</script>

<div class="column">
	<Help_Message text="todo" />
	<div>
		<a href="https://github.com/feltcoop/felt/issues">github.com/feltcoop/felt/issues</a>
	</div>
</div>

<style>
	.column {
		margin: auto;
	}
	div {
		padding: var(--spacing_lg) 0;
		text-align: center;
	}
</style>
