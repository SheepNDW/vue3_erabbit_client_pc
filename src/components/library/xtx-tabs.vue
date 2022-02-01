<script>
import { useVModel } from '@vueuse/core';
import { provide } from 'vue';
export default {
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props, { emit }) {
    // 接收v-model的值
    const activeName = useVModel(props, 'modelValue', emit);
    // 點擊選項卡觸發的函式
    const tabClick = (name, index) => {
      activeName.value = name;
      // 提供一個tab-click自定義事件
      emit('tab-click', { name, index });
    };
    // 給每一個panel提供當前的activeName
    provide('activeName', activeName);

    return { activeName, tabClick };
  },
  render() {
    // 獲取插槽內容
    const panels = this.$slots.default();
    // 動態的panels元件集合
    const dynamicPanels = [];
    panels.forEach(item => {
      // 靜態
      if (item.type.name === 'XtxTabsPanel') {
        dynamicPanels.push(item);
      } else {
        // v-for 渲染出來的
        item.children.forEach(item => {
          dynamicPanels.push(item);
        });
      }
    });

    // 需要在這裡進行組織
    // 1. tabs元件大容器
    // 2. 選項卡的導覽列結構
    // 3. 內容容器
    const nav = (
      <nav>
        {dynamicPanels.map((item, i) => {
          return (
            <a
              onClick={() => this.tabClick(item.props.name, i)}
              class={{ active: item.props.name === this.activeName }}
              href="javascript:;"
            >
              {item.props.label}
            </a>
          );
        })}
      </nav>
    );

    return <div class="xtx-tabs">{[nav, dynamicPanels]}</div>;
  },
};
</script>

<style lang="scss" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid $xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
