<script>
	let { currentSong = $bindable(), player, songs } = $props();
</script>

<div class="songs flex flex-col overflow-auto">
	{#each songs as song}
		<button
			onclick={(e) => {
				// console.log(song);
				currentSong = song;
				player.loadVideoById(currentSong.id);
			}}
			class="song-{song.id} flex cursor-pointer flex-row gap-2 p-1 text-left {currentSong == song
				? 'bg-white/70  dark:bg-gray-800'
				: ''}"
		>
			<img
				class="aspect-square w-[60px] rounded object-cover xl:w-[100px]"
				src={song.snippet?.thumbnails?.medium?.url}
				alt=""
			/>
			<div>
				<div>{song.snippet?.title}</div>
				<div class="text-xs">{song.album.snippet?.title}</div>
			</div>
		</button>
	{/each}
</div>
