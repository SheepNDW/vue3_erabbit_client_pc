// 提供商品相關的API函式
import request from '@/utils/request'

/**
 * 獲取商品詳情
 * @param {String} id - 商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

/**
 * 獲取相關推薦商品|猜你喜歡商品
 * @param {String} id - 商品id, 傳入相關推薦, 不傳猜你喜歡
 * @param {Integer} limit - 商品數量
 */
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}