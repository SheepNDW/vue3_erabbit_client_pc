// 提供商品相關的API函式
import request from '@/utils/request'

/**
 * 獲取商品詳情
 * @param {String} id - 商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}