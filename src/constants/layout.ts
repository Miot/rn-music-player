import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Platform } from 'react-native'
import { colors } from './tokens'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = Platform.select({
	ios: {
		headerLargeTitle: true,
		headerLargeStyle: {
			backgroundColor: colors.background,
		},
		headerLargeTitleStyle: {
			color: colors.text,
		},
		headerTintColor: colors.text,
		headerTransparent: true,
		headerBlurEffect: 'prominent',
		headerShadowVisible: false,
	},
	default: {
		headerLargeTitle: true,
		headerShadowVisible: false,
		headerStyle: {
			backgroundColor: colors.background,
		},
		headerTitleStyle: {
			fontWeight: 'bold',
		},
		headerTintColor: colors.text,
	},
})
