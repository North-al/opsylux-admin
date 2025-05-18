import type { App } from 'vue'
import { setupElementPlusIcons } from './elementPlusIcon'

export const setupPlugins = (app: App) => {
	setupElementPlusIcons(app)
}
