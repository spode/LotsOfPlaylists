<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import Player from './Player.svelte';
	import { shuffle } from '$lib/utils';

	import type { CustomAlbum, CustomSong } from '$lib/myinterfaces';
	import Albums from './Albums.svelte';
	import Songs from './Songs.svelte';

	let { data } = $props();

	let activeAlbums = new SvelteSet<CustomAlbum>();

	let allSongs: CustomSong[] = $derived(
		Array.from(activeAlbums)
			.flatMap((album) => album.songs)
			.filter((e) => e.contentDetails?.duration?.includes('M'))
	);
	let songs = $derived(shuffle(allSongs));

	let currentSong: CustomSong | undefined = $state.raw();
	let nextSong = $derived(songs[(songs.indexOf(currentSong) + 1) % songs.length]);
	let player = $state(null);

	let selectableAlbums = $derived(
		data.channelPlaylists.filter((element) => {
			return !activeAlbums.has(element);
		})
	);

	let selectedAlbums = $derived(
		data.channelPlaylists.filter((element) => {
			return activeAlbums.has(element);
		})
	);

	function toggleActiveAlbum(album: CustomAlbum) {
		if (!activeAlbums.has(album)) {
			activeAlbums.add(album);
		} else {
			activeAlbums.delete(album);
		}
	}

	function playNextSong() {
		// currentSong = songs[nextSongIndex];

		// const nextSong = songs[(songs.indexOf(currentSong) + 1) % songs.length];
		currentSong = nextSong;

		if (!player) return;
		if (currentSong) {
			player.loadVideoById(currentSong.id);
			document
				.querySelector(`.song-${currentSong.id}`)
				.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
		} else {
			console.log('could not play next song');
		}
	}

	// $inspect(activeAlbums, songs, data);
</script>

<main
	class=" mx-auto flex h-full max-w-6xl flex-col overflow-auto lg:flex-row xl:grid xl:grid-cols-3 xl:grid-rows-2"
>
	<div class="selectableAlbumsWrapper flex flex-1 flex-col overflow-auto">
		<h2 class="text-center lg:text-lg">albums</h2>
		<Albums albums={selectableAlbums} {toggleActiveAlbum} />
	</div>

	<div class="selectedAlbumsWrapper flex flex-1 flex-col overflow-auto">
		<h2 class="text-center lg:text-lg">active</h2>
		<Albums albums={selectedAlbums} {toggleActiveAlbum} />
	</div>

	<div class="songsWrapper flex flex-1 flex-col overflow-auto">
		<h2 class="text-center lg:text-lg">songs</h2>
		<Songs {songs} {player} bind:currentSong />
	</div>
	<div class=" flex-1 xl:col-span-3">
		<Player {playNextSong} bind:player />
	</div>
</main>
