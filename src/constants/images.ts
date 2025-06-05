import unknownArtistImage from '@/assets/unknown_artist.png'
import unknownTrackImage from '@/assets/unknown_track.png'
import { Asset } from 'expo-asset'

export const unknownTrackImageUri = Asset.fromModule(unknownTrackImage).uri
export const unknownArtistImageUri = Asset.fromModule(unknownArtistImage).uri
