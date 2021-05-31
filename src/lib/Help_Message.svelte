<script lang="ts">
	import Message from './Message.svelte';

	export let text: string | null;
</script>

<!-- TODO auto foward props? -->
<Message {text} icon="ⓘ" --message_color="var(--help_color)" />
