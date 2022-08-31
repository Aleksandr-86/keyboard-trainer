import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Typing from '@/views/Typing.vue'
import OverallStats from '@/views/OverallStats.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/typing',
      name: 'typing',
      component: Typing
    },
    {
      path: '/overall-stats',
      name: 'stats',
      component: OverallStats
    }
  ]
})

export default router
