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
  <HomeNew />
  <!-- 人氣推薦 -->
</template>

<script>
import HomeCategory from './components/home-category.vue';
import HomeBanner from './components/home-banner.vue';
import HomeNew from './components/home-new.vue';
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
  },
};
</script>

<style lang="scss" scoped></style>
