import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		// API 自动导入
		Components({
			/* options */
			dts: 'src/components.d.ts',
			extensions: ['vue', 'tsx', 'ts'],
			deep: true,
			include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
			exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
			resolvers: [ElementPlusResolver()]
		}),
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'pinia',
				{
					// add any other imports you were relying on
				}
			],
			dts: 'src/auto-imports.d.ts',
			dirs: ['src/stores'],
			vueTemplate: true,
			eslintrc: {
				enabled: true, // Default `false`
				filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
			resolvers: [ElementPlusResolver()]
		}),
		// UnoCSS 配置
		UnoCSS({})
	],
	resolve: {
		alias: {
			'~': resolve(__dirname, 'src')
		}
	}
})
