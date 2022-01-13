// 給 vee-validate 提供校驗規則函式
export default {
  // 用戶名校驗
  account(value) {
    if (!value) return '請輸入用戶名'
    // 規則: 字母開頭 6-20 字元之間
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '需是字母開頭且為6-20個字元'
    return true
  },
  // 密碼校驗
  password(value) {
    if (!value) return '請輸入密碼'
    // 規則: 格式為6-24個字元
    if (!/^\w{6,24}$/.test(value)) return '密碼為6-24個字元'
    return true
  },
  mobile(value) {
    if (!value) return '請輸入手機號碼'
    // 規則: 09開頭, 任意8個數字結尾
    if (!/^09\d{8}$/.test(value)) return '手機格式不正確'
    return true
  },
  code(value) {
    if (!value) return '請輸入驗證碼'
    // 規則: 6個數字
    if (!/^\d{6}$/.test(value)) return '驗證碼為6個數字'
    return true
  },
  isAgree(value) {
    if (!value) return '請勾選同意用戶協議'
    return true
  }
}