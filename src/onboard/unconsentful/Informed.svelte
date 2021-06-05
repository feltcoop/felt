<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Markup from '$lib/Markup.svelte';
	import Checkbox from '$lib/Checkbox.svelte';
	import Help_Message from '$lib/Help_Message.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
	export let back: () => void;

	let consenting = true; // :-)

	$: enable_continue_button = consenting;

	const on_click_privacy = () => alert('lol');
	const on_click_terms = () => alert('dont u dare');
</script>

<Markup>
	<p>
		Here is our <small
			><a href="/privacy" on:click|preventDefault={on_click_privacy}>privacy policy</a></small
		>
		and
		<small><a href="/terms" on:click|preventDefault={on_click_terms}>terms of service</a></small>.
		We care about you, really.
	</p>
	<p>
		Now click the win button!!! <button
			class="inline"
			on:click={() =>
				alert(
					'wow you did it! you win! \n\nhey look a doggy \n\n🐕\n\nkeep playing for more rewards! :-)',
				)}
		>
			win!!!
		</button>
	</p>
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
		I acknowledge I am legally bound to the above
		<br />
		and my only recourse is complaining on social media
	</Markup>
</button>

<Help_Message text="This is legally binding but do not worry about it :-)" />

<style>
	small {
		font-size: 10px;
	}
</style>
