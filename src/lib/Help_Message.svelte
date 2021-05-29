<script lang="ts">
	import Message from './Message.svelte';

	export let text: string | null;
</script>

<Message {text} --message_color="green" />
