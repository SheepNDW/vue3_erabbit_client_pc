<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 麵包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首頁</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">
          {{ goods.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">
          {{ goods.categories[0].name }}
        </XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
        </div>
        <div class="spec"></div>
      </div>
      <!-- 商品推薦 -->
      <GoodsRelevant />
      <!-- 商品詳情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+評價 -->
          <div class="goods-tabs"></div>
          <!-- 注意事項 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24熱綁+專題推薦 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, ref, watch } from 'vue';
import { findGoods } from '@/api/product';
import { useRoute } from 'vue-router';
import GoodsRelevant from './components/goods-relevant.vue';
import GoodsImage from './components/goods-image.vue';
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage },
  setup() {
    // 1. 獲取商品詳情, 進行渲染
    const goods = useGoods();
    return { goods };
  },
};
// 獲取商品詳情
const useGoods = () => {
  // 出現路由地址商品id發生變化, 但不會重新初始化元件
  const goods = ref(null);
  const route = useRoute();
  watch(
    () => route.params.id,
    newValue => {
      if (newValue && `/product/${newValue}` === route.path) {
        findGoods(route.params.id).then(data => {
          // 讓商品資料為null 然後使用v-if的元件能重新銷毀和創建
          goods.value = null;
          nextTick(() => {
            goods.value = data.result;
          });
        });
      }
    },
    { immediate: true }
  );

  return goods;
};
</script>

<style lang="scss" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
