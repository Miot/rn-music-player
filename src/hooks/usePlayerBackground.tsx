import { colors } from '@/constants/tokens'
import { useEffect, useState } from 'react'
import { getColors } from 'react-native-image-colors'
import { ImageColorsResult } from 'react-native-image-colors/build/types'

export const usePlayerBackground = (imageUrl: string) => {
	const [imageColors, setImageColor] = useState<ImageColorsResult | null>(null)

	useEffect(() => {
		getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		})
			.then((colors) => setImageColor(colors))
			.catch((error) => {
				console.warn('无法获取图片颜色:', error)
				// 发生错误时使用默认颜色
				setImageColor({
					platform: 'web',
					dominant: colors.background,
					vibrant: colors.textMuted,
					lightVibrant: colors.textMuted,
					muted: colors.background,
					darkMuted: colors.background,
					lightMuted: colors.textMuted,
				} as ImageColorsResult)
			})
	}, [imageUrl])

	return { imageColors }
}
