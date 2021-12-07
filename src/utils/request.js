import axios from "axios";
import store from "@/store";
import router from "@/router";

// 匯出基準地址, 給其他不是通過axios發請求的地方用
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // axios常見配置, baseURL timeout
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  // 攔截業務邏輯
  // 進行請求配置的修改
  // 如果本地有token就在頭部攜帶

  // 1.獲取用戶資料
  const { profile } = store.state.user
  // 2.判斷是否有token
  if (profile.token) {
    // 3.設置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }

  return config
}, err => {
  return Promise.reject(err)
})

// res => res.data 取出data數據, 將來調用接口時直接拿到的就是後台數據
instance.interceptors.response.use(res => res.data, err => {
  // 401 狀態碼, 進入該函式
  if (err.response && err.response.status === 401) {
    // 1.清空無效用戶資料
    // 2.跳轉到登入頁
    // 3.跳轉需要傳參 (當前路由地址) 給登入頁
    store.commit('user/setUser', {})
    // 當前路由地址
    // 組件中: `/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
    // js模組中: router.currentRoute.value.fullPath 就是當前路由地址 router.currentRoute 是ref響應式數據
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // encodeURIComponent 轉換uri編碼，防止解析地址出問題
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 請求工具函式
export default (url, method, submitData) => {
  // 負責發請求: 請求地址, 請求方式, 提交的數據
  return instance({
    url,
    method,
    // 1.如果是get請求, 需要使用params來傳遞submitData
    // 2.如果不是get請求, 需要使用data來傳遞submitData
    // [] 設置一個動態的key, 寫js表達式, 用執行結果當作key
    // method參數: get, Get, GET 轉換成小寫在進行判斷
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}