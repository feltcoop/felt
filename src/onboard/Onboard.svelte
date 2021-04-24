<script lang="ts">
	import OnboardLeft from './left/OnboardLeft.svelte';
	import OnboardRight from './right/OnboardRight.svelte';
</script>

<div class="onboard">
	<section class="left"><OnboardLeft /></section>
	<section class="right"><OnboardRight /></section>
</div>

<style>
	.onboard {
		height: 100%;
		display: flex;
	}
	section {
		height: 100%;
		flex: 1;
		border: 1px solid #ccc;
	}
</style>
