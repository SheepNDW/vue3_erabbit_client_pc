<template>
  <!-- 首頁入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左側導覽 -->
      <HomeCategory />
      <!-- 輪播圖 -->
      <HomeBanner />
    </div>
  </div>
  <!-- 新鮮好物 -->
  <HomePanel title="新鮮好物" sub-title="新鮮出爐 品質保證">
    <template #right><XtxMore path="/" /></template>
    <!-- 面板內容 -->
  </HomePanel>
  <!-- 人氣推薦 -->
</template>

<script>
import HomeCategory from './components/home-category.vue';
import HomeBanner from './components/home-banner.vue';
import HomePanel from './components/home-panel.vue';
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomePanel,
  },
};
</script>

<style lang="scss" scoped></style>
