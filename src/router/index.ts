import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../pages/Login/index.vue'
import Home from '../pages/Home/index.vue'
import Welcome from '../pages/Welcome/index.vue'
import Users from '../pages/Users/index.vue'
import Roles from '../pages/Roles/index.vue'
import Rights from '../pages/Rights/index.vue'
import Goods from '../pages/Goods/index.vue'
import Params from '../pages/Params/index.vue'
import Classify from '../pages/Classify/index.vue'
import Orders from '../pages/Orders/index.vue'
import Reports from '../pages/Reports/index.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/home',
    redirect: '/welcome',
    component: Home,
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'users',
        component: Users
      },
      {
        path: '/roles',
        name: 'roles',
        component: Roles
      },
      {
        path: '/rights',
        name: 'rights',
        component: Rights
      },
      {
        path: '/goods',
        name: 'goods',
        component: Goods
      },
      {
        path: '/params',
        name: 'params',
        component: Params
      },
      {
        path: '/categories',
        name: 'categories',
        component: Classify
      },
      {
        path: '/orders',
        name: 'orders',
        component: Orders
      },
      {
        path: '/reports',
        name: 'reports',
        component: Reports
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') next()

  // 获取本地token
  const USER_KEY = window.localStorage.getItem('USER_KEY')
  if (!USER_KEY) return next('/login')
  next()
})

export default router
