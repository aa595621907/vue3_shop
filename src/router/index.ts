import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../pages/Login/index.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
