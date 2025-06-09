import { unknownArtistImageUri } from '@/constants/images'
import { fontSize } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { Artist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import FastImage from '@preflower/react-native-web-fast-image'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { QueueControls } from './QueueControls'
import { TracksList } from './TracksList'

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in songs',
		},
	})

	const filteredArtistTracks = useMemo(() => {
		return artist.tracks.filter(trackTitleFilter(search))
	}, [artist.tracks, search])

	return (
		<TracksList
			id={generateTracksListId(artist.name, search)}
			scrollEnabled={false}
			hideQueueControls={true}
			ListHeaderComponentStyle={styles.artistHeaderContainer}
			ListHeaderComponent={
				<View>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: unknownArtistImageUri,
							}}
							style={styles.artistImage}
						/>
					</View>

					<Text numberOfLines={1} style={styles.artistNameText}>
						{artist.name}
					</Text>

					{search.length == 0 && (
						<QueueControls tracks={filteredArtistTracks} style={{ paddingTop: 24 }} />
					)}
				</View>
			}
			tracks={artist.tracks}
		/>
	)
}

const styles = StyleSheet.create({
	artistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 200,
	},
	artistImage: {
		width: 200,
		height: '100%',
		resizeMode: 'cover',
		borderRadius: '50%',
	},
	artistNameText: {
		...defaultStyles.text,
		marginTop: 20,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
