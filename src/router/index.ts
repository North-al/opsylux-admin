import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('~/pages/Home.vue')
        },
        {
            path: '/table',
            name: 'table',
            component: () => import('~/pages/Table.vue')
        }
    ]
})

export const setupRouter = (app: App) => {
    app.use(router)
}
