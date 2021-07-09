<script lang="ts">
	import type {Onboard_Data} from '$lib/onboard/onboard';
	import Markup from '$lib/ui/Markup.svelte';
	import Checkbox from '$lib/ui/Checkbox.svelte';
	import Help_Message from '$lib/ui/Help_Message.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;

	let consenting = true; // :-)
	let won = false; // you did it!

	$: enable_continue_button = consenting;
</script>

<Markup>
	<p>
		<small>
			Here is our <a href="/privacy" on:click|preventDefault={() => alert('lol')}>
				privacy policy
			</a>
			and
			<a
				href="/terms"
				on:click|preventDefault={() => alert('We The Company do whatever we want. Deal?')}
			>
				terms of service
			</a>
		</small>.
	</p>
	<p>
		Now click the win button! <button class="inline" disabled={won} on:click={() => (won = true)}>
			win!!!
		</button>
	</p>
	{#if won}
		<p>
			Wow you did it! You win a doggy:
			<span class="dog">🐕</span>
		</p>
		<p>Now click "I accept" below for more rewards :-)</p>
	{/if}
</Markup>

<Checkbox bind:checked={consenting} --content="'✗'">
	<Markup>
		<div>I consent to:</div>
		<ul>
			<li>everything I did not read</li>
			<li>everything I did read</li>
		</ul>
		whether or not I understand anything.
	</Markup>
</Checkbox>

<button on:click={() => done()} disabled={!enable_continue_button}>
	<Markup>
		I accept I am legally bound to the above
		<br />
		and my only recourse is complaining on social media
	</Markup>
</button>

<Help_Message text="This is legally binding but do not worry about it :-)" />

<style>
	small {
		font-size: var(--font_size_xs);
	}
	.dog {
		font-size: var(--font_size_xl4);
	}
</style>
