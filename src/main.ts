import { createApp } from 'vue'
import App from './App.vue'
import { setupPlugins } from './plugins/index.ts'
import { setupStyles } from './styles/index.ts'
import { setupRouter } from './router/index.ts'

const app = createApp(App)
setupPlugins(app)
setupStyles()
setupRouter(app)
app.mount('#app')
