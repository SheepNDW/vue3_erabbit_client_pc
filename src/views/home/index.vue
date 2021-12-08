<template>
  <div class="container">
    <!-- 首頁入口 -->
    <div class="home-entry">
      <!-- 左側導覽 -->
      <HomeCategory />
      <!-- 輪播圖 -->
    </div>
  </div>
</template>

<script>
import HomeCategory from './components/home-category.vue';
export default {
  name: 'HomePage',
  components: { HomeCategory },
};
</script>

<style lang="scss" scoped></style>
