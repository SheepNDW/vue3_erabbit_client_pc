import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// 引入獨立的三個模組
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
  modules: {
    cart,
    user,
    category
  },
  // 配置插件
  plugins: [
    // 默認儲存在LocalStorage
    createPersistedState({
      // 本地儲存的名字
      key: 'errabit-client-pc-store',
      // 指定需要儲存的模組
      paths: ['user', 'cart']
    })
  ]
})
