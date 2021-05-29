<script lang="ts">
	import type {StateMachine, State, Send} from './machine';

	export let machine: StateMachine | null = null;
	export let state: State;
	export let send: Send | null = null;
</script>

<pre>{JSON.stringify($state, null, 2)}</pre>
