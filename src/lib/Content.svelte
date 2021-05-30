<div class="content">
	<slot />
</div>

<style>
	.content {
		padding: var(--spacing_lg);
		/* hmm font-size: var(--font_size_md) */
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	.content :global(ul) {
		padding-left: var(--spacing_xl);
	}
	.content :global(li) {
		list-style: disc;
	}
	.content :global(p) {
		padding: var(--spacing_lg) 0;
	}
	.content :global(h1) {
		padding-bottom: var(--spacing_lg);
	}
</style>
