<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 麵包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首頁</XtxBreadItem>
        <XtxBreadItem to="/">手机</XtxBreadItem>
        <XtxBreadItem to="/">华为</XtxBreadItem>
        <XtxBreadItem to="/">p30</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
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
import GoodsRelevant from './components/goods-relevant.vue';
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant },
};
</script>

<style lang="scss" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
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
