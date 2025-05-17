import { createApp } from 'vue'
import 'uno.css'
import App from './App.tsx'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.mount('#app')
