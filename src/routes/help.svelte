<script lang="ts">
	import Help_Message from '$lib/Help_Message.svelte';
</script>

<div class="column">
	<Help_Message text="todo" />
	<h2>
		<a href="https://github.com/feltcoop/felt/issues">github.com/feltcoop/felt/issues</a>
	</h2>
</div>

<style>
	.column {
		margin: auto;
	}
	h2 {
		padding: var(--spacing_lg) 0;
		text-align: center;
	}
</style>
