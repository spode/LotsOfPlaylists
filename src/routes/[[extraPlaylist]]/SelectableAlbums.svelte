<script>
	let { selectableAlbums, toggleActiveAlbum } = $props();
</script>

<div
	class="selectableAlbums grid grid-cols-[repeat(auto-fit,_minmax(min(100px,100%),1fr))] content-start gap-1 overflow-auto"
>
	{#each selectableAlbums as album}
		<button
			onclick={() => {
				toggleActiveAlbum(album);
			}}
			class="flex cursor-pointer rounded-lg"
		>
			<img
				class="aspect-square max-w-[80px] rounded object-cover text-left lg:max-w-[100px]"
				src={album.snippet?.thumbnails?.medium?.url}
				alt=""
			/>
			<!-- <div class="p-4">{album.snippet?.title}</div> -->
		</button>
	{/each}
</div>
