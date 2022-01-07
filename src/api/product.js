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

/**
 * 查詢商品評價資訊
 * @param {String} id - 商品id 
 */
export const findGoodsCommentInfo = (id) => {
  // return request(`/goods/${id}/evaluate`, 'get')
  // axios遇見 http https 開頭的地址, 不會加上基準地址
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

/**
 * 查詢商品評價列表
 * @param {String} id - 商品id 
 * @param {Object} params - 篩選條件 
 */
export const findGoodsCommentList = (id, params) => {
  // return request(`/goods/${id}/evaluate`, 'get')
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}