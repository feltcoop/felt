<div class="markup">
	<slot />
</div>

<style>
	.markup {
		padding: var(--spacing_lg);
		/* hmm font-size: var(--font_size_md) */
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	.markup :global(ul) {
		padding-left: var(--spacing_xl);
		list-style: disc;
	}
	.markup :global(p) {
		padding: var(--spacing_lg) 0;
	}
	.markup :global(h1) {
		padding-bottom: var(--spacing_lg);
	}
</style>
