// 擴充vue原有的功能: 全局元件, 自定義指令, 掛載原型方法

import XtxSkeleton from './xtx-skeleton.vue'

export default {
  install(app) {
    // 在app上進行擴展, app提供 component directive 函式
    // 如果要掛載原型 app.config.globalProperties 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
  }
}