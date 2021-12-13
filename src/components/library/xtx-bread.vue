<script>
import { h } from 'vue';
export default {
  name: 'XtxBread',
  render() {
    // 用法:
    // 1. template 標籤去除
    // 2. 返回值就是元件內容
    // 3. vue2.0 的h函式傳參進來的, vue3.0 的h函式匯入進來的
    // 4. h的第一個參數 標籤名字, 第二個參數 標籤屬性物件, 第三個參數 子節點
    // 需求:
    // 1. 創建xtx-bread父容器
    // 2. 獲取默認插槽內容
    // 3. 去除xtx-bread-item元件中的i標籤, 應該由render函式來組織
    // 4. 遍歷插槽中的item, 得到一個動態創建的節點, 最後一個item不加i標籤
    // 5. 把動態創建的節點渲染在xtx-bread標籤中
    const items = this.$slots.default();
    const dymanicItems = [];
    items.forEach((item, i) => {
      dymanicItems.push(item);
      if (i < items.length - 1)
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }));
    });
    return h('div', { class: 'xtx-bread' }, dymanicItems);
  },
};
</script>

<style lang="scss">
// 去除 scoped 屬性, 讓樣式作用到xtx-bread-item元件
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: $xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
