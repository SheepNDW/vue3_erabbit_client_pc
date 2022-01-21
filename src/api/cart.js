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