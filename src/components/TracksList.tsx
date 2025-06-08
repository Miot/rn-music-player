import { unknownTrackImageUri } from '@/constants/images'
import { useQueue } from '@/store/queue'
import { utilsStyles } from '@/styles'
import FastImage from '@preflower/react-native-web-fast-image'
import { useRef } from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { TrackListItem } from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	id: string
	tracks: Track[]
}

const ItemDivider = () => {
	return <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
}

export const TracksList = ({ id, tracks, ...props }: TracksListProps) => {
	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()

	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIndex = tracks.findIndex((track) => selectedTrack.url === track.url)
		if (trackIndex === -1) return

		const isChangingQueue = id !== activeQueueId
		if (isChangingQueue) {
			const tracksQueue = tracks.slice(trackIndex).concat(tracks.slice(0, trackIndex))

			await TrackPlayer.reset()
			await TrackPlayer.add(tracksQueue)
			await TrackPlayer.play()

			queueOffset.current = trackIndex
			setActiveQueueId(id)
		} else {
			const nextTrackIndex =
				trackIndex - queueOffset.current < 0
					? tracks.length + trackIndex - queueOffset.current
					: trackIndex - queueOffset.current
			await TrackPlayer.skip(nextTrackIndex)
			TrackPlayer.play()
		}
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={tracks.length ? ItemDivider : null}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyComponentText}>No songs found</Text>
					<FastImage
						source={{ uri: unknownTrackImageUri }}
						style={utilsStyles.emptyComponentImage}
					></FastImage>
				</View>
			}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...props}
		/>
	)
}
