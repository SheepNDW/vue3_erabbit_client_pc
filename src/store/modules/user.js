// 用戶模組

export default {
  namespaced: true,
  state() {
    return {
      // 用戶資料
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    // 修改用戶資料, payload就是用戶資料物件
    setUser(state, payload) {
      state.profile = payload
    }
  }
}