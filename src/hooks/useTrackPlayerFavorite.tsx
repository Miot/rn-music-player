import { useFavorites } from '@/store/library'
import { useCallback } from 'react'
import TrackPlayer, { Track, useActiveTrack } from 'react-native-track-player'

export const useTrackPlayerFavorite = () => {
	const activeTrack = useActiveTrack()
	const { favorites, toggleTrackFavorite } = useFavorites()

	const isFavorite = favorites.find((track: Track) => track.url === activeTrack?.url)?.rating === 1

	const toggleFavorite = useCallback(async () => {
		const id = await TrackPlayer.getActiveTrackIndex()

		if (!id) return
		await TrackPlayer.updateMetadataForTrack(id, {
			rating: isFavorite ? 0 : 1,
		})

		if (activeTrack) {
			toggleTrackFavorite(activeTrack)
		}
	}, [activeTrack, isFavorite, toggleTrackFavorite])

	return {
		isFavorite,
		toggleFavorite,
	}
}
