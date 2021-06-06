<script lang="ts">
	import Message from './Message.svelte';

	export let text: string | null;
</script>

<!-- TODO redesign? maybe just make `error` an option on `Message`? -->
<Message {text} icon="‼" --message_color="var(--error_color)" />
