<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}

<svelte:head>
	<title>All the Albums!</title>
</svelte:head>
