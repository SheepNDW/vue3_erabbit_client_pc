<template>
  <div class="goods-tabs">
    <nav>
      <a
        @click="activeName = 'GoodsDetail'"
        :class="{ active: activeName === 'GoodsDetail' }"
        href="javascript:;"
      >
        商品詳情
      </a>
      <a
        @click="activeName = 'GoodsComment'"
        :class="{ active: activeName === 'GoodsComment' }"
        href="javascript:;"
      >
        商品評價<span>(500+)</span>
      </a>
    </nav>
    <!-- 切換内容的地方 -->
    <!-- 在vue中動態的去切換元件其實可以使用動態元件component元件 -->
    <!-- is屬性用來決定component動態渲染成哪個元件, 值為元件的名稱即可 -->
    <component :is="activeName"></component>
  </div>
</template>

<script>
import { ref } from 'vue';
import GoodsDetail from './goods-detail.vue';
import GoodsComment from './goods-comment.vue';
export default {
  name: 'GoodsTabs',
  components: { GoodsDetail, GoodsComment },
  setup() {
    // activeName的值: GoodsDetail GoodsComment
    const activeName = ref('GoodsDetail');
    return { activeName };
  },
};
</script>

<style lang="scss" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: $xtxColor;
        }
      }
    }
  }
}
</style>
