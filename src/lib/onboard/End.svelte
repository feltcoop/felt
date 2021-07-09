<script lang="ts">
	import {grin} from '$lib/ui/icons';
	import Markup from '$lib/ui/Markup.svelte';
	import Credits from '$lib/onboard/Credits.svelte';
	import {get_devmode} from '$lib/ui/devmode';

	const devmode = get_devmode();
</script>

<Markup>
	<h1>Thanks for playing!</h1>
	<p>We appreciate you taking the time to go through this sketch.</p>
	<p>We hope you learned something & had some fun in the process {grin}</p>
	<blockquote>
		if you have any questions or comments, please email us at
		<a href="mailto:team@felt.social">team@felt.social</a> or open an issue
		<a href="https://github.com/feltcoop/felt">on GitHub</a>
	</blockquote>
	<Credits />
	<blockquote>
		if you'd like to explore freely, press the <code>Backtick</code> key or click this button:
		<button class="inline" on:click={() => ($devmode = !$devmode)}>
			{$devmode ? 'disable' : 'enable'} devmode
		</button>
	</blockquote>
</Markup>
