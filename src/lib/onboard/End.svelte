<script lang="ts">
	import {grin} from '$lib/icons';
	import Markup from '$lib/Markup.svelte';
	import Credits from './Credits.svelte';
	import {use_devmode} from '$lib/devmode';

	const devmode = use_devmode();
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
	<p>
		If you'd like to explore freely, press the <code>Backtick</code> key or click this button:
		<button class="inline" on:click={() => ($devmode = !$devmode)}>
			{$devmode ? 'disable' : 'enable'} devmode
		</button>
	</p>
</Markup>
