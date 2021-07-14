<div class="markup">
	<slot />
</div>

<style>
	.markup {
		overflow-wrap: break-word;
		padding: var(--spacing_lg);
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	.markup :global(ul),
	.markup :global(ol) {
		padding: var(--spacing_rg) 0 var(--spacing_rg) var(--spacing_xl);
		list-style: disc;
	}
	.markup :global(ol) {
		list-style: decimal;
	}
	.markup :global(li) {
		display: list-item;
	}
	.markup :global(p) {
		padding: var(--spacing_rg) 0;
	}
	.markup :global(h1) {
		padding-bottom: var(--spacing_rg) 0 var(--spacing_lg);
	}
</style>
