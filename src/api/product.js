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

/**
 * 獲取熱銷榜資料
 * @param {String} id - 商品id
 * @param {Integer} limit - 商品數量
 * @param {Integer} type - 熱銷類型, 1為24hr 2為週榜 3為總榜 默認值為1
 */
export const findGoodsHot = ({ id, limit = 3, type = 1 }) => {
  return request('/goods/hot', 'get', { id, limit, type })
}