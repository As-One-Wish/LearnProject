import { createRouter, createWebHistory } from 'vue-router'
import LayoutPage from '@/views/layout/LayoutContainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: LayoutPage }]
})

export default router
