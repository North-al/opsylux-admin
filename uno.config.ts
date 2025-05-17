import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
	// 预设
	presets: [presetWind3(), presetAttributify(), presetIcons()],
	// 快捷方式
	shortcuts: {
		'flex-center': 'flex items-center justify-center',
		'flex-between': 'flex items-center justify-between',
		'text-primary': 'text-[#409EFF]',
		'text-regular': 'text-[#606266]',
		'text-secondary': 'text-[#909399]',
		'bg-primary': 'bg-[#409EFF]'
	},
	// 主题
	theme: {
		colors: {
			primary: '#409EFF',
			success: '#67C23A',
			warning: '#E6A23C',
			danger: '#F56C6C',
			info: '#909399'
		}
	},
	// 规则
	rules: [['card-shadow', { 'box-shadow': '0 1px 4px rgba(0, 21, 41, 0.08)' }]]
})
