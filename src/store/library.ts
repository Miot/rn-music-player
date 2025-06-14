import library from '@/assets/data/library.json'
import { unknownTrackImageUri } from '@/constants/images'
import { Artist, Playlist, TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

interface LibrayState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

const useLibraryStore = create<LibrayState>((set) => ({
	tracks: library,
	toggleTrackFavorite: (track) =>
		set((state) => ({
			tracks: state.tracks.map((curTrack) => {
				if (curTrack.url === track.url) {
					return {
						...curTrack,
						rating: curTrack.rating === 1 ? 0 : 1,
					}
				}

				return curTrack
			}),
		})),
	addToPlaylist: (track, playlistName) =>
		set((state) => ({
			tracks: state.tracks.map((curTrack) => {
				if (curTrack.url === track.url) {
					return {
						...curTrack,
						playlist: [...(curTrack.playlist ?? []), playlistName],
					}
				}

				return curTrack
			}),
		})),
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const favorites = useTracks().filter((track) => track.rating === 1)
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return {
		favorites,
		toggleTrackFavorite,
	}
}

export const useArtists = () =>
	useTracks().reduce((acc, track) => {
		const existingArtist = acc.find((artist) => artist.name === track.artist)

		if (existingArtist) {
			existingArtist.tracks.push(track)
		} else {
			acc.push({
				name: track.artist ?? 'Unknown',
				tracks: [track],
			})
		}

		return acc
	}, [] as Artist[])

export const usePlaylists = () => {
	const playlists = useTracks().reduce((acc, track) => {
		track.playlist?.forEach((playlistName) => {
			const existing = acc.find((playlist) => playlist.name === playlistName)

			if (existing) {
				existing.tracks.push(track)
			} else {
				acc.push({
					name: playlistName,
					tracks: [track],
					artworkPreview: track.artwork ?? unknownTrackImageUri,
				})
			}
		})

		return acc
	}, [] as Playlist[])

	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

	return { playlists, addToPlaylist }
}
