<div class="content">
	<slot />
</div>

<style>
	.content :global(ul) {
		padding-left: var(--spacing_xl);
	}
	.content :global(li) {
		list-style: disc;
	}
</style>
