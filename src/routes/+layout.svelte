<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}

<svelte:head>
	<title>Lots of Playlists!</title>
</svelte:head>
