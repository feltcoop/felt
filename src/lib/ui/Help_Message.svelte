<script lang="ts">
	import Message from '$lib/ui/Message.svelte';

	export let text: string | null;
</script>

<!-- TODO redesign? maybe just make `help` an option on `Message`? -->
<Message {text} icon="ⓘ" --message_color="var(--help_color)" />
