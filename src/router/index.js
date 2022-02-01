import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import { h } from 'vue'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/index')
const TopCategory = () => import('@/views/category/index')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')
const Cart = () => import('@/views/cart/index')

const Login = () => import('@/views/login/index')

const Checkout = () => import('@/views/member/pay/checkout')
const Pay = () => import('@/views/member/pay/index')
const PayResult = () => import('@/views/member/pay/result')

const MemberLayout = () => import('@/views/member/Layout')
const MemberHome = () => import('@/views/member/home')
const MemberOrder = () => import('@/views/member/order')
const MemberOrderDetail = () => import('@/views/member/order/detail')

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
      { path: '/member/pay', component: Pay },
      { path: '/pay/callback', component: PayResult },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          // { path: '/member/order', component: MemberOrder },
          // { path: '/member/order/:id', component: MemberOrderDetail },
          {
            path: '/member/order',
            // 創建一個RouterView容器形成嵌套關係
            component: { render: () => h(<RouterView />) },
            children: [
              { path: '', component: MemberOrder },
              { path: ':id', component: MemberOrderDetail }
            ]
          }
        ]
      },
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
