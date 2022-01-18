// 購物車模組

export default {
  namespaced: true,
  state() {
    return {
      // 購物車商品內容
      list: []
    }
  },
  mutations: {
    // 加入購物車
    insertCart(state, payload) {
      // 約定加入購物車字段必須和後端保持一致 payload物件的字段
      // 它們是: id skuId name attrsText picture price nowPrice selected stock count isEffective
      // 插入資料規則: 
      // 1. 先找下是否有相同商品
      // 2. 如果有相同的商品, 查詢它的數量, 累加到payload上, 保存到最新位置, 原商品需刪除
      // 3. 如果沒有相同商品, 保存到最新位置即可
      const sameIndex = state.list.findIndex(item => item.skuId === payload.skuId)
      if (sameIndex >= 0) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 刪除原有商品
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    }
  },
  actions: {
    // 加入購物車
    insertCart(ctx, payload) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登入
        } else {
          // 未登入
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    }
  }
}