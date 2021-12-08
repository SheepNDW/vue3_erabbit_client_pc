// 分類模組
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state() {
    return {
      // 分類訊息集合, 依賴topCategory重新設置, 確保初始化就有資料
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改分類函式
  mutations: {
    // payload 所有的分類集合
    setList(state, payload) {
      state.list = payload
    },
    // 定義show和hide控制當前分類的二級分類的顯示與否
    show(state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide(state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  // 獲取分類函式
  actions: {
    async getList({ commit }) {
      // 獲取分類資料
      const data = await findAllCategory()
      // 給每個分類加上控制二級分類顯示和隱藏的屬性資料
      data.result.forEach(top => {
        top.open = false
      })
      // 修改分類資料
      commit('setList', data.result)
    }
  }
}