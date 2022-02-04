// 訂單相關的API函式

import request from "@/utils/request";

/**
 * 結算頁面-生成訂單
 * @returns Promise
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get')
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

