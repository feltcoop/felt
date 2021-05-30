<script lang="ts">
	import FeltHeart from '$lib/FeltHeart.svelte';
</script>

<h1>@feltcoop/felt</h1>
<!-- TODO publish and link the above to npm -->

<section>
	<div class="learn">
		<a href="https://www.felt.social/about">
			<div>learn → about ← Felt</div>
			<FeltHeart />
		</a>
	</div>
</section>

<section>
	<a href="https://github.com/feltcoop/felt">source code on GitHub</a>
	<div class="links">
		@feltcoop on
		<a href="https://github.com/feltcoop">GitHub</a> and
		<a href="https://twitter.com/feltcoop">Twitter</a>
	</div>
</section>

<style>
	h1,
	h2 {
		margin: 20px 0;
		text-align: center;
	}
	section {
		text-align: center;
	}
	.learn {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: var(--font_size_lg);
	}
	.learn a {
		font-weight: var(--font_weight_lt);
	}
	.links {
		font-size: var(--font_size_lg);
		font-weight: var(--font_weight_lt);
	}
	.links a {
		font-weight: var(--font_weight_lt);
	}
</style>
