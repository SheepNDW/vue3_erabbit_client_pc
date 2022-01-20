import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm.vue'

// 準備一個DOM
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

// 返回的是Promise物件, 點取消和確認都要銷毀元件, 
export default ({ title, text }) => {
  // 1. 匯入被創建的元件
  // 2. 使用createVNode創建虛擬節點
  // 3. 準備一個DOM容器裝載元件
  // 4. 使用render函式渲染元件到容器 
  return new Promise((resolve, reject) => {
    // 點擊取消觸發的函式
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('點擊取消'))
    }
    // 點擊確認觸發的函式
    const submitCallback = () => {
      render(null, div)
      resolve()
    }

    const vn = createVNode(XtxConfirm, { title, text, cancelCallback, submitCallback })
    render(vn, div)
  })
}