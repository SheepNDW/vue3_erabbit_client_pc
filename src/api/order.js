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

