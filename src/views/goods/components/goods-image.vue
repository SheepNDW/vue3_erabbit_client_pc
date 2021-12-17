<template>
  <div class="goods-image">
    <!-- 大圖 -->
    <div
      v-show="show"
      class="large"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"
    ></div>
    <!-- 中圖 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <!-- 遮罩色塊 -->
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>
    <!-- 小圖 -->
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue';
import { useMouseInElement } from '@vueuse/core';
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    // 當前預覽圖索引
    const currIndex = ref(0);

    // 1. 是否顯示遮罩和大圖
    const show = ref(false);
    // 2. 遮罩座標(樣式)
    const layerPosition = reactive({
      left: 0,
      top: 0,
    });
    // 3. 大圖背景定位(樣式)
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0,
    });
    // 4. 使用useMouseInElement得到基於元素左上角的座標和是否離開元素數據
    const target = ref(null);
    const { elementX, elementY, isOutside } = useMouseInElement(target);
    watch([elementX, elementY, isOutside], () => {
      // 5. 根據得到的數據設置樣式數據和是否顯示數據
      show.value = !isOutside.value;
      // 計算座標
      const position = { x: 0, y: 0 };

      if (elementX.value < 100) position.x = 0;
      else if (elementX.value > 300) position.x = 200;
      else position.x = elementX.value - 100;

      if (elementY.value < 100) position.y = 0;
      else if (elementY.value > 300) position.y = 200;
      else position.y = elementY.value - 100;

      // 給樣式賦值
      layerPosition.left = position.x + 'px';
      layerPosition.top = position.y + 'px';
      largePosition.backgroundPositionX = -2 * position.x + 'px';
      largePosition.backgroundPositionY = -2 * position.y + 'px';
    });

    return { currIndex, show, layerPosition, largePosition, target };
  },
};
</script>

<style lang="scss" scoped>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
