// 提供首頁相關的API函式
import request from "@/utils/request"

/**
 * 獲取品牌
 * @param {Integer} limit - 品牌個數
 * @returns Promise
 */
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}