<script>
	let { selectableAlbums, toggleActiveAlbum } = $props();
</script>

<div
	class="selectableAlbums grid grid-cols-[repeat(auto-fit,_minmax(min(80px,100%),1fr))] gap-1 overflow-auto lg:grid-cols-[repeat(auto-fit,_minmax(min(100px,100%),1fr))]"
>
	{#each selectableAlbums as album}
		<button
			onclick={() => {
				toggleActiveAlbum(album);
			}}
			class="flex cursor-pointer rounded-lg"
		>
			<img
				class="aspect-square rounded object-cover text-left lg:max-w-[100px]"
				src={album.snippet?.thumbnails?.medium?.url}
				alt=""
			/>
			<!-- <div class="p-4">{album.snippet?.title}</div> -->
		</button>
	{/each}
</div>
