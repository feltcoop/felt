<script lang="ts">
	import type {State_Machine, State, Send} from './machine';

	export let machine: State_Machine | null = null;
	export let state: State;
	export let send: Send | null = null;
</script>

<pre>{JSON.stringify($state, null, 2)}</pre>
