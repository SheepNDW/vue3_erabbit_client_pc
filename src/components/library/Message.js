// 提供一個能夠提示xtx-message元件的函式
// 這個函式將來可以匯入直接使用, 也可以掛載在Vue實例原型上
// import Message from 'Message.js' Message({type:'error', text:'提示文字'})
// this.$message({type:'error', text:'提示文字'})

import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

// DOM容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

// 定時器標記
let timer = null

export default ({ type, text }) => {
  // 渲染元件
  // 1. 匯入消息提示元件
  // 2. 將消息提示元件編譯為虛擬節點(dom節點)
  // createVNode(元件, 屬性物件(props))
  const vnode = createVNode(XtxMessage, { type, text })
  // 3. 準備一個裝載消息提示元件的DOM容器
  // 4. 將虛擬節點渲染在容器中
  // render(虛擬節點, DOM容器)
  render(vnode, div)

  // 5. 3秒後銷毀元件
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}