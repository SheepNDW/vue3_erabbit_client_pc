import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/index')
const TopCategory = () => import('@/views/category/index')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')
const Cart = () => import('@/views/cart/index')

const Login = () => import('@/views/login/index')

const Checkout = () => import('@/views/member/pay/checkout')

const routes = [
  // 一級路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: Checkout },
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切換路由時, 滾動到頁面頂部
  scrollBehavior() {
    // vue 2.0 x y 控制
    // vue 3.0 left top 控制
    return { left: 0, top: 0 }
  }
})

// 前置導航守衛
router.beforeEach((to, from, next) => {
  // 需要登入的路由: 地址是以 /member 開頭
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
