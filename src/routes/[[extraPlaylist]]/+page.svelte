<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import type { PageData } from './$types';
	import Player from './Player.svelte';
	import { shuffle } from '$lib/utils';
	import { onMount } from 'svelte';

	import type { CustomAlbum, CustomSong } from '$lib/myinterfaces';
	import Albums from './Albums.svelte';
	import Songs from './Songs.svelte';
	import SelectableAlbums from './SelectableAlbums.svelte';
	onMount(() => {
		console.log('data is ', data);
	});

	let { data }: { data: PageData } = $props();

	let activeAlbums = new SvelteSet<CustomAlbum>();

	let farts = 'hellop';

	console.log(farts);

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
	class="mx-auto flex h-full max-w-6xl flex-col overflow-auto lg:flex-row xl:grid xl:grid-cols-3 xl:grid-rows-2"
>
	<div class="selectableAlbumsContainer flex flex-1 flex-col">
		<h2 class="text-center">albums</h2>
		<SelectableAlbums {selectableAlbums} {toggleActiveAlbum} />
	</div>

	<div class="selectedAlbumsContainer flex flex-1 flex-col">
		<h2 class="text-center">active</h2>
		<Albums {selectedAlbums} {toggleActiveAlbum} />
	</div>

	<div class="songsContainer flex flex-1 flex-col">
		<h2 class="text-center">songs</h2>
		<Songs {songs} {player} bind:currentSong />
	</div>
	<div class=" flex-1 xl:col-span-3">
		<Player {playNextSong} bind:player />
	</div>
</main>
