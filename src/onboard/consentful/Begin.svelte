<script lang="ts">
	import type {Onboard_Data} from '../onboard';
	import Content from '$lib/Content.svelte';

	export let data: Onboard_Data;
	export let done: () => void;
</script>

<Content>
	<p>welcome.</p>
	<p>
		this study is inspired by <a href="https://consentful.systems">consentful.systems</a>
	</p>
	<p>(TODO proper credits)</p>
	<p>
		permissive open source code at <a href="https://github.com/feltcoop/felt">github</a>
	</p>
</Content>
