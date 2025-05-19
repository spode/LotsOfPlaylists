<script>
	let { selectedAlbums, toggleActiveAlbum } = $props();
</script>

<div
	class="albums grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] content-start gap-1 overflow-auto"
>
	{#each selectedAlbums as album}
		<button
			onclick={() => {
				toggleActiveAlbum(album);
			}}
			class=" flex cursor-pointer rounded-lg text-left"
		>
			<img
				class="aspect-square max-w-[100px] rounded object-cover"
				src={album.snippet?.thumbnails?.medium?.url}
				alt=""
			/>
			<!-- <div class="p-4">{album.snippet?.title}</div> -->
		</button>
	{/each}
</div>
