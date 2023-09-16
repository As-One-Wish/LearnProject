import { createRouter, createWebHistory } from 'vue-router'
import LayoutPage from '@/views/layout/LayoutContainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutPage,
      children: [
        {
          path: '/info/password',
          component: () => import('@/views/information/PasswordPanel.vue')
        },
        { path: '/info/normal', component: () => import('@/views/information/NormalPanel.vue') }
      ]
    }
    // {
    //   path: '/settings',
    //   component: () => import('@/views/settings/SettingsPanel.vue')
    // }
  ]
})

export default router
