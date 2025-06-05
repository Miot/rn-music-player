import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import { TrackListItem } from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<unknown>> & {
	tracks: any[]
}

const ItemDivider = () => {
	return <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
}

export const TracksList = ({ tracks, ...props }: TracksListProps) => {
	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TrackListItem
					track={{
						...track,
						image: track.artwork,
					}}
				/>
			)}
			{...props}
		/>
	)
}
