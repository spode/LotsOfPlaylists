import { CHANNELS } from '$env/static/private';
import { getChannelPlaylistsWithItems, getPlaylistWithVideos } from '$lib/server/ytapi';
import { shuffle } from '$lib/utils';

let channelIds = CHANNELS.split(",")

let channelPlaylists = (await Promise.all(channelIds.map(async element => {
    return await getChannelPlaylistsWithItems(element)
}))).flat();

export const load = (async ({ params }) => {

    let extraPlaylistId = params.extraPlaylist ?? "PL4iv3Q3xc0skeScJ7XEZoK73INblR0mQA"

    const extraPlaylist = await getPlaylistWithVideos(extraPlaylistId)

    return { channelPlaylists: [extraPlaylist, ...shuffle(channelPlaylists)] };
})