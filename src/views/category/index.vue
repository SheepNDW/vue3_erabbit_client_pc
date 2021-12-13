<template>
  <div class="top-category">
    <div class="container">
      <!-- 麵包屑 -->
      <XtxBread>
        <XtxBreadItem :to="{ path: '/' }">首頁</XtxBreadItem>
        <XtxBreadItem to="/category/1005000">電器</XtxBreadItem>
        <XtxBreadItem>空調</XtxBreadItem>
      </XtxBread>
      <!-- 輪播圖 -->
      <!-- 全部分類 -->
      <!-- 各分類推薦商品 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopCategory',
};
</script>

<style lang="scss" scoped></style>
