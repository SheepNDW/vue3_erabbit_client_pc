// 訂單相關的API函式

import request from "@/utils/request";

/**
 * 結算頁面-生成訂單-根據購物車選中商品
 * @returns Promise
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 結算頁面-生成訂單-根據訂單商品(再次購買)
 * @returns Promise
 */
export const repurchaseOrder = (orderId) => {
  return request(`/member/order/repurchase/${orderId}`, 'get')
}

/**
 * 新增取貨地址
 * @param {Object} address - 地址物件
 * @returns Promise
 */
export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}

/**
 * 修改取貨地址信息
 * @param {Object} address - 地址物件
 */
export const editAddress = (address) => {
  return request(`/member/address/${address.id}`, 'put', address)
}

/**
 * 結算頁面-提交訂單
 * @param {Object} order - 訂單信息
 */
export const submitOrder = (order) => {
  return request('/member/order', 'post', order)
}

/**
 * 獲取訂單詳情
 * @param {String} id - 訂單ID
 */
export const findOrderDetail = (id) => {
  return request('/member/order/' + id, 'get')
}

/**
 * 獲取訂單列表
 * @param {Number} page - 頁碼
 * @param {Number} pageSize - 每頁條數
 * @param {Number} orderState - 訂單狀態，1為待付款、2為待發貨、3為待收货、4為待評價、5為已完成、6為已取消，未傳該參數或0為全部
 * @returns Promise
 */
export const findOrderList = ({ page = 1, pageSize = 10, orderState = 0 }) => {
  return request('/member/order', 'get', { page, pageSize, orderState })
}

/**
 * 取消訂單
 * @param {String} orderId - 訂單ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const cancelOrder = ({ orderId, cancelReason }) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

/**
 * 刪除訂單
 * @param {String} orderId - 訂單ID
 * @returns 
 */
export const deleteOrder = (orderId) => {
  return request(`/member/order`, 'delete', { ids: [orderId] })
}

/**
 * 確認收貨
 * @param {String} orderId - 訂單ID
 * @returns 
 */
export const confirmOrder = (orderId) => {
  return request(`/member/order/${orderId}/receipt`, 'put')
}

/**
 * 查詢物流
 * @param {String} orderId - 訂單ID
 * @returns 
 */
export const logisticsOrder = (orderId) => {
  return request(`/member/order/${orderId}/logistics`, 'get')
}