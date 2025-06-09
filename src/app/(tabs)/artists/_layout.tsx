import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const ArtistsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{ headerTitle: 'Artists', ...StackScreenWithSearchBar }}
				/>

				<Stack.Screen
					name="[name]"
					options={{
						headerTitle: '',
						headerBackVisible: true,
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTintColor: colors.primary,
						headerShadowVisible: false,
					}}
				/>
			</Stack>
		</View>
	)
}

export default ArtistsScreenLayout
