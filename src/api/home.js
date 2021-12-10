// 提供首頁相關的API函式
import request from '@/utils/request'

/**
 * 獲取品牌
 * @param {Integer} limit - 品牌個數
 * @returns Promise
 */
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

/**
 * 獲取廣告區輪播圖
 * @returns Promise
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}

/**
 * 獲取新鮮好物
 * @returns Promise
 */
export const findNew = () => {
  return request('/home/new', 'get')
}

/**
 * 獲取人氣推薦
 * @returns Promise
 */
export const findHot = () => {
  return request('/home/hot', 'get')
}

/**
 * 獲取商品區塊
 * @returns Promise
 */
export const findGoods = () => {
  return request('/home/goods', 'get')
}

/**
 * 獲取最新專題
 * @returns Promise
 */
export const findSpecial = () => {
  return request('/home/special', 'get')
}

