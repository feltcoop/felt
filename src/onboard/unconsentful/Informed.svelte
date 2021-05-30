<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Content from '$lib/Content.svelte';
	import Help_Message from '$lib/Help_Message.svelte';

	export let data: Onboard_Data;
	export let done: () => void;

	let consenting = true; // :-)

	$: enable_continue_button = consenting;
</script>

<label>
	<input type="checkbox" bind:checked={consenting} />
	<Content>
		<div>I consent to:</div>
		<ul>
			<li>everything I read</li>
			<li>everything I did not read</li>
			<li>whether or not I understood anything</li>
		</ul>
	</Content>
</label>

<Help_Message text="This is legally binding but don't worry about it. :-)" />

<button type="button" on:click={() => done()} disabled={!enable_continue_button}>
	I acknowledge I am legally bound to the above and my only recourse is complaining on social media
</button>
