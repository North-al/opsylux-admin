import { createApp } from 'vue'
import App from './App.vue'
import { setupPlugins } from './plugins/index.ts'
import { setupStyles } from './styles/index.ts'

const app = createApp(App)
setupPlugins(app)
setupStyles()
app.mount('#app')
