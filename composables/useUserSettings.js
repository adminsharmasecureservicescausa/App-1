import { useStorage } from '@vueuse/core'

const version = useStorage('settings-version', 1, localStorage)

const navigationTouchGestures = useStorage('settings-navigationTouchGestures', true, localStorage)
const postFullSizeImages = useStorage('settings-postFullSizeImages', false, localStorage)
const postsPerPage = useStorage('settings-postsPerPage', 35, localStorage)

export const useUserSettings = () => {
	return reactive({
		version,

		navigationTouchGestures,

		postFullSizeImages,
		postsPerPage
	})
}
