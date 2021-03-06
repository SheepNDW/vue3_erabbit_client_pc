// 購物車模組

import { checkAllCart, deleteCart, findCart, getNewCartGoods, insertCart, mergeCart, updateCart } from "@/api/cart"

export default {
  namespaced: true,
  state() {
    return {
      // 購物車商品內容
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList(state) {
      // 有效商品: 庫存(stock)>0, 有效標誌(isEffective)為true
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    // 有效商品總件數
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品總金額
    validAmount(state, getters) {
      // return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
      return getters.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 無效商品列表
    invalidList(state) {
      return state.list.filter(item => item.stock <= 0 || !item.isEffective)
    },
    // 已選商品列表
    selectedList(state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 已選商品件數
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已選商品總金額
    selectedAmount(state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 是否全選
    isCheckAll(state, getters) {
      return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
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
    },
    // 修改購物車商品
    updateCart(state, goods) {
      // goods 商品訊息: nowPrice, stock, isEffective
      // goods 商品物件的字段不固定, 物件中有哪些字段就改哪些字段, 字段的值合理才改
      // goods 商品物件 必需有SKUID
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 刪除購物車商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 設置購物車
    setCart(state, payload) {
      // payload為空陣列, 清空 ; 為有值的陣列, 設置
      state.list = payload
    }
  },
  actions: {
    // 加入購物車
    insertCart(ctx, payload) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          // 已登入
          insertCart({ skuId: payload.skuId, count: payload.count }).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登入
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 獲取商品列表
    findCart(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登入
          findCart().then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登入
          // 同時發送請求(有幾件商品就發幾次), 等所有請求成功, 一併去修改本地資料
          // Promise.all(promise陣列).then((dataList) => {}) 同時發請求, 所有請求成功後, 得到所有成功結果
          // Promise.resolve() Promise.reject() new Promise()
          // Promise.race(promise陣列).then((data) => {}) 同時發請求, 最快的請求成功, 得到成功結果
          const promiseArr = ctx.state.list.map(item => {
            return getNewCartGoods(item.skuId)
          })
          // dataList成功結果的集合, 資料順序和promiseArr順序一致, 它又是根據 state.list 而來
          Promise.all(promiseArr).then(dataList => {
            // 更新本地購物車
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            // 調用 resolve 代表操作成功
            resolve()
          }).catch(e => reject(e))
        }
      })
    },
    // 刪除購物車商品
    deleteCart(ctx, payload) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          // 已登入
          deleteCart([payload]).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登入
          // 單條刪除 payload 就是skuId
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 修改購物車 (選中狀態, 數量)
    updateCart(ctx, payload) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          // 已登入
          updateCart(payload).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登入
          // payload 需要: 必需有skuId 可能: selected count
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 全選與取消全選
    checkAllCart(ctx, selected) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          // 已登入
          const ids = ctx.getters.validList.map(item => item.skuId)
          checkAllCart({ selected, ids }).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登入
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 批量刪除
    batchDeleteCart(ctx, isClear) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          // 已登入
          const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(item => item.skuId)
          deleteCart(ids).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登入
          // 找出選中的商品列表, 遍歷調用刪除的mutations
          // isClear為true, 刪除失效商品列表, 否則是選中商品列表
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 修改規格
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          // 已登入
          // 1. 找出舊的商品訊息
          // 2. 刪除舊商品資料
          // 3. 原先商品的數量+新的skuId
          // 4. 添加新的商品
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          deleteCart([oldGoods.skuId]).then(() => {
            return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
          }).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登入
          // 1. 找出舊的商品訊息
          // 2. 刪除舊商品資料
          // 3. 根據新的sku訊息和舊的商品訊息, 合併成一條新的購物車商品資料
          // 4. 添加新的商品
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          ctx.commit('deleteCart', oldSkuId)
          const { skuId, price: nowPrice, specsText: attrsText, inventory: stock } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, attrsText, stock }
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 合併購物車
    async mergeCart(ctx) {
      // 合併參數
      const cartList = ctx.state.list.map(goods => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      await mergeCart(cartList)
      // 合併成功, 清空本地購物車
      ctx.commit('setCart', [])
    }
  }
}