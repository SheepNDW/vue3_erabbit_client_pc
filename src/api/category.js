// 定義分類相關的API接口函式
import request from "@/utils/request";

/**
 * 獲取所有分類(頂級, 二級, 對應商品推薦資料)
 * @returns Promise
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 獲取頂級類目資訊 (children屬性就是各個子分類)
 * @param {String} id - 頂級類目id
 * @returns Promise
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/**
 * 獲取2級類目下的篩選資料
 * @param {String} id - 2級類目id
 * @returns Promise
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * 獲取分類下的商品 (帶篩選條件)
 * @param {Object} params - 可參考接口文檔
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}