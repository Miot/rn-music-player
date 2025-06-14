import { PlaylistTracksList } from '@/components/PlaylistTracksList'
import { screenPadding } from '@/constants/tokens'
import { usePlaylists } from '@/store/library'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

const PlaylistScreen = () => {
	const { name: playlistName } = useLocalSearchParams<{ name: string }>()
	const { playlists } = usePlaylists()
	const playlist = playlists.find((p) => p.name === playlistName)

	if (!playlist) {
		console.warn('not found')
		return <Redirect href={'/(tabs)/playlists'} />
	}

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			style={{
				paddingHorizontal: screenPadding.horizontal,
				backgroundColor: 'black',
			}}
		>
			<PlaylistTracksList playlist={playlist} />
		</ScrollView>
	)
}

export default PlaylistScreen
