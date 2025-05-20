<script>
	let { albums, toggleActiveAlbum } = $props();
</script>

<div
	class="albums grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] content-start gap-1 overflow-auto"
>
	{#each albums as album}
		<button
			onclick={() => {
				toggleActiveAlbum(album);
			}}
			class=" flex cursor-pointer rounded-lg text-left"
		>
			<img
				class="aspect-square max-w-[80px] rounded object-cover lg:max-w-[100px]"
				src={album.snippet?.thumbnails?.medium?.url}
				alt=""
			/>
			<!-- <div class="p-4">{album.snippet?.title}</div> -->
		</button>
	{/each}
</div>
