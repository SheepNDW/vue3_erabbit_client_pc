// 用戶相關的接口

import request from "@/utils/request"

/**
 * 帳號密碼登入
 * @param {String} acconut - 帳號
 * @param {String} password - 密碼
 * @returns promise
 */
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}