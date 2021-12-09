<template>
  <div class="home-banner">
    <XtxCarousel auto-play :sliders="sliders" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { findBanner } from '@/api/home';
export default {
  name: 'HomeBanner',
  setup() {
    // 獲取輪播圖資料
    const sliders = ref([]);
    findBanner().then(data => {
      sliders.value = data.result;
    });
    return { sliders };
  },
};
</script>

<style lang="scss" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
// 覆蓋樣式
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
