import { createRouter, createWebHistory } from 'vue-router'
import LayoutPage from '@/views/layout/LayoutContainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutPage,
      redirect: '/info',
      children: [
        {
          path: '/info',
          component: () => import('@/views/information/InfoDisplay.vue')
        },
        {
          path: '/settings',
          component: () => import('@/views/settings/SettingsPanel.vue')
        }
      ]
    }
  ]
})

export default router
