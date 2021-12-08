import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置樣式庫
import 'normalize.css'
// 專案中自行設定的重置樣式及公用樣式
import '@/assets/styles/common.scss'

createApp(App).use(store).use(router).mount('#app')
