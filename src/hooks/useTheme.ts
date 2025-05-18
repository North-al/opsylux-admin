export type Theme = 'light' | 'dark'

const THEME_KEY = 'admin-theme'
const HTML_ELEMENT = document.documentElement

export const useTheme = () => {
	// 从本地存储获取主题，默认深色主题
	const theme = ref<Theme>((localStorage.getItem(THEME_KEY) as Theme) || 'dark')

	// 切换主题
	const toggleTheme = () => {
		theme.value = theme.value === 'dark' ? 'light' : 'dark'
	}

	// 应用主题
	const applyTheme = (value: Theme) => {
		// 使用 dark class 控制主题
		if (value === 'dark') {
			HTML_ELEMENT.classList.add('dark')
		} else {
			HTML_ELEMENT.classList.remove('dark')
		}
		// 修改系统主题色
		const metaThemeColor = document.querySelector('meta[name="theme-color"]')
		if (metaThemeColor) {
			metaThemeColor.setAttribute('content', value === 'dark' ? '#1f1f1f' : '#ffffff')
		}
	}

	// 监听主题变化
	watch(
		theme,
		value => {
			applyTheme(value)
			localStorage.setItem(THEME_KEY, value)
		},
		{ immediate: true }
	)

	return {
		theme,
		toggleTheme
	}
}
