<div class="content">
	<slot />
</div>

<style>
	.content :global(ul) {
		padding-left: var(--spacing_lg);
	}
	.content :global(li) {
		list-style: disc;
	}
</style>
