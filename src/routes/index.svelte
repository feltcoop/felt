<script lang="ts">
	import Felt_Heart from '$lib/Felt_Heart.svelte';
</script>

<h1>@feltcoop/felt</h1>
<!-- TODO publish and link the above to npm -->

<section>
	<div class="learn">
		<a href="https://www.felt.social/about">
			<div>learn → about ← Felt</div>
			<Felt_Heart />
		</a>
	</div>
</section>
<section>
	<a href="https://github.com/feltcoop/felt">source code on GitHub</a>
</section>
<section>
	<div class="links">
		@feltcoop on
		<a href="https://github.com/feltcoop">GitHub</a> and
		<a href="https://twitter.com/feltcoop">Twitter</a>
	</div>
</section>

<style>
	h1 {
		margin: 20px 0;
		text-align: center;
	}
	section {
		text-align: center;
		padding: var(--spacing_lg) 0;
	}
	.learn {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: var(--font_size_lg);
	}
	a {
		font-size: var(--font_size_lg);
		font-weight: var(--font_weight_2);
	}
	.links {
		font-size: var(--font_size_lg);
		font-weight: var(--font_weight_2);
	}
</style>
