import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/index')
const TopCategory = () => import('@/views/category/index')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')

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
    ]
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

export default router
