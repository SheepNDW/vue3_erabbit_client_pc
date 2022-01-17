// 用戶相關的接口

import request from "@/utils/request"

/**
 * 帳號密碼登入
 * @param {String} acconut - 帳號
 * @param {String} password - 密碼
 * @returns Promise
 */
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

/**
 * 簡訊登入
 * @param {String} mobile - 手機號碼
 * @param {String} code - 驗證碼 (預設123456)
 * @returns Promise
 */
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}

/**
 * 獲取簡訊登入驗證碼
 * @param {String} mobile - 手機號碼
 * @returns Promise
 */
export const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

