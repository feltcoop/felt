<script lang="ts">
	import Felt_Heart from '$lib/ui/Felt_Heart.svelte';
	import {arrow_left, arrow_right} from '$lib/ui/icons';
</script>

<h1>@feltcoop/felt</h1>
<!-- TODO publish and link the above to npm -->

<section>
	<div class="learn">
		<a href="https://www.felt.social/about">
			<div>learn {arrow_right} about {arrow_left} Felt</div>
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
	a {
		font-size: var(--font_size_lg);
		font-weight: var(--font_weight_2);
	}
	.learn {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: var(--font_size_lg);
	}
	.learn a {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.links {
		font-size: var(--font_size_lg);
		font-weight: var(--font_weight_2);
	}
</style>
