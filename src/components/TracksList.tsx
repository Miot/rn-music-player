import { unknownTrackImageUri } from '@/constants/images'
import { utilsStyles } from '@/styles'
import FastImage from '@preflower/react-native-web-fast-image'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { TrackListItem } from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const ItemDivider = () => {
	return <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
}

export const TracksList = ({ tracks, ...props }: TracksListProps) => {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
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
