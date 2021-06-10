<script lang="ts">
	import {grin} from '$lib/icons';
	import Markup from '$lib/Markup.svelte';
	import Credits from './Credits.svelte';
</script>

<Markup>
	<h1>thanks for playing!</h1>
	<br />
	<span>
		we appreciate you taking the time to go through this sketch <br />
		we hope you learned something & had some fun in the process {grin}
	</span>
	<br />
	<span
		>if you have any questions or comments, please email us at
		<a href="info@felt.social?subject=Thought about Consentful Onboarding Sketch"
			>info@felt.social</a
		> or leave a comment on the github repo</span
	>
	<Credits />
</Markup>
