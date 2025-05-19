<script>
	let { currentSong = $bindable(), player, songs } = $props();
</script>

<div class="songs flex flex-col overflow-auto">
	{#each songs as song}
		<button
			onclick={(e) => {
				currentSong = song;
				player.loadVideoById(currentSong.id);
			}}
			class="song-{song.id} flex cursor-pointer flex-row gap-2 p-1 text-left {currentSong == song
				? 'bg-white/70  dark:bg-gray-800'
				: ''}"
		>
			<img
				class="aspect-square w-[80px] rounded object-cover"
				src={song.snippet?.thumbnails?.medium?.url}
				alt=""
			/>
			<div class="flex flex-col justify-center">
				<div class="lg:text-xl">{song.snippet?.title}</div>
				<div class="text-xs">{song.album.snippet?.title}</div>
			</div>
		</button>
	{/each}
</div>
