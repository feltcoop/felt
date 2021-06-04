<script lang="ts">
	import type {Writable} from 'svelte/store';

	export let devmode: Writable<boolean>;

	const on_window_keydown = (e: KeyboardEvent) => {
		if (e.key === '`') {
			$devmode = !$devmode;
		}
	};
</script>

<svelte:window on:keydown={on_window_keydown} />

{#if $devmode}
	<button class="devmode" on:click={() => ($devmode = !$devmode)} />
{/if}

<style>
	button {
		position: absolute;
		right: 0;
		top: 0;
	}
	button:after {
		content: 'devmode';
	}
	button:hover:after {
		content: '✕ devmode';
	}
</style>
