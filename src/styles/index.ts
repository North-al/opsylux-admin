import 'uno.css'
import './theme/variables.scss'
import './global.scss'
import './menu.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

export const setupStyles = () => {
	// 初始化主题
	const theme = localStorage.getItem('admin-theme') || 'dark'
	if (theme === 'dark') {
		document.documentElement.classList.add('dark')
	}
}
