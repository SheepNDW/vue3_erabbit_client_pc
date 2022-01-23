// 封裝購物車相關的API函式
import request from "@/utils/request";

/**
 * 獲取商品的 最新價格 庫存 是否有效
 * @param {String} skuId - SKU id
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 獲取商品的specs和skus
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合併購物車
 * @param {Array<object>} cartList - 購物車訊息列表
 * @param {String} object.skuId - SKUID
 * @param {boolean} object.selected - 選中狀態
 * @param {integer} object.count - 數量
 */
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 獲取登入後購物車列表
 * @returns Promise
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}

/**
 * 加入購物車
 * @param {String} skuId - 商品SKUID
 * @param {Integer} count - 商品數量
 * @returns Promise
 */
export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 刪除商品（支持批量刪除）
 * @param {Array<string>} ids - skuId集合
 * @returns Promise
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}

/**
 * 修改購物車商品的狀態和數量
 * @param {String} skuId - 商品sku
 * @param {Boolean} selected - 選中狀態
 * @param {Integer} count - 商品數量
 * @returns Promise
 */
export const updateCart = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}

/**
 * 全選反選
 * @param {Boolean} selected - 選中狀態
 * @param {Array<string>} ids - 有效商品skuId集合
 * @returns Promise
 */
export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}

