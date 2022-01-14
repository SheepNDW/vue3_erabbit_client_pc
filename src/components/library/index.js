// 擴充vue原有的功能: 全局元件, 自定義指令, 掛載原型方法

import defaultImg from '@/assets/images/200.png'
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

import Message from './Message'

// 導入library資料夾下的所有元件
// 批量導入需要使用一个函式 require.context(dir,deep,matching)
// 參數：1. 目錄  2. 是否加載子目錄  3. 加載檔案的正則匹配
const importFn = require.context('./', false, /\.vue$/)

export default {
  install(app) {
    // 在app上進行擴展, app提供 component directive 函式
    // 如果要掛載原型 app.config.globalProperties 方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    // 根據keys 批量註冊
    importFn.keys().forEach(path => {
      // 導入元件
      const component = importFn(path).default
      // 進行註冊
      app.component(component.name, component)
    })

    // 定義指令
    defineDirective(app)

    // 定義一個原型函式
    app.config.globalProperties.$message = Message
  }
}

// 定義指令
const defineDirective = (app) => {
  // 1. 圖片懶加載指令 v-lazy
  // 原理: 先儲存圖片地址不能在src上, 當圖片進入可視區, 將儲存的圖片地址設置給圖片元素即可
  app.directive('lazy', {
    mounted(el, binding) {
      // 2. 創建一個觀察對象, 來觀察當前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止觀察
          observe.unobserve(el)
          // 3. 把指令的值設置給el的src屬性 binding.value就是指令的值
          // 4. 處理圖片載入失敗 error是圖片載入失敗的事件 load是圖片載入成功
          el.onerror = () => {
            // 載入失敗 設置默認圖
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 開啟觀察
      observe.observe(el)
    },
  })
}