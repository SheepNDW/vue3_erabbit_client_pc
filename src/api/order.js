// 訂單相關的API函式

import request from "@/utils/request";

/**
 * 結算頁面-生成訂單
 * @returns Promise
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}