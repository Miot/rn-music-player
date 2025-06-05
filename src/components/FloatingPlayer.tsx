import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import FastImage from '@preflower/react-native-web-fast-image'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Track, useActiveTrack } from 'react-native-track-player'

export const FloatingPlayer = ({ style }: { style: ViewStyle }) => {
	const activeTrack = useActiveTrack()
	const displayedTrack: Track = activeTrack ?? {
		title: 'THis is just a song',
	}

	if (!displayedTrack) return null

	return (
		<TouchableOpacity style={[style, styles.container]} activeOpacity={0.9}>
			<>
				<FastImage
					source={{ uri: displayedTrack.artwork ?? unknownTrackImageUri }}
					style={styles.trackArtworkImage}
				></FastImage>

				<View style={styles.trackTitleContainer}>
					<Text style={styles.trackTitle}>{displayedTrack.title}</Text>
				</View>

				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
})
