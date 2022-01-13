// 給 vee-validate 提供校驗規則函式
export default {
  // 用戶名校驗
  account(value) {
    if (!value) return '請輸入用戶名';
    // 規則: 字母開頭 6-20 字元之間
    if (!/^[a-zA-Z]\w{5-19}$/.test(value)) return '需是字母開頭且為6-20個字元'
    return true;
  },
}