import { StopPropagation } from '@/components/StopPropagation'
import { TracksShortcutsMenu } from '@/components/TrackShortcutsMenu'
import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Entypo, Ionicons } from '@expo/vector-icons'
import FastImage from '@preflower/react-native-web-fast-image'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { ScaleLoader } from 'react-spinners'

export type TrackListItemProps = {
	track: Track
	onTrackSelect: (track: Track) => void
}

export const TrackListItem = ({ track, onTrackSelect: handleTrackSelect }: TrackListItemProps) => {
	const isActiveTrack = useActiveTrack()?.url === track.url
	const { playing } = useIsPlaying()

	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
			<View style={styles.trackItemContainer}>
				<View>
					<FastImage
						source={{
							uri: track.artwork ?? unknownTrackImageUri,
						}}
						style={{
							...styles.trackArtworkImage,
							opacity: isActiveTrack ? 0.6 : 1,
						}}
					/>

					{isActiveTrack &&
						(playing ? (
							<ScaleLoader
								height={15}
								width={2}
								color={colors.icon}
								style={styles.trackPlayingIconIndicator}
							/>
						) : (
							<Ionicons
								name="play"
								size={24}
								color={colors.icon}
								style={styles.trackPauseIconIndicator}
							/>
						))}
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ width: '100%' }}>
						<Text
							numberOfLines={1}
							style={{
								...styles.trackTitleText,
								color: isActiveTrack ? colors.primary : colors.text,
							}}
						>
							{track.title}
						</Text>

						{track.artist && (
							<Text numberOfLines={1} style={styles.trackArtistText}>
								{track.artist}
							</Text>
						)}
					</View>

					<StopPropagation>
						<TracksShortcutsMenu track={track}>
							<Entypo name="dots-three-horizontal" size={18} color={colors.icon}></Entypo>
						</TracksShortcutsMenu>
					</StopPropagation>
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '400',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 16,
		left: 10,
	},
	trackPauseIconIndicator: {
		position: 'absolute',
		top: 12,
		left: 14,
	},
})
