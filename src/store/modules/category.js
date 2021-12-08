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
    }
  },
  // 獲取分類函式
  actions: {
    async getList({ commit }) {
      // 獲取分類資料
      const data = await findAllCategory()
      // 修改分類資料
      commit('setList', data.result)
    }
  }
}