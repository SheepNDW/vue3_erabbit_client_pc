<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <!-- 圖片容器 -->
    <ul class="carousel-body">
      <!-- fade 加在想要顯示的圖片上 -->
      <li
        class="carousel-item"
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ fade: index === i }"
      >
        <!-- 圖片 -->
        <RouterLink v-if="item.imgUrl" :to="item.hrefUrl">
          <img :src="item.imgUrl" />
        </RouterLink>
        <!-- 商品列表 item=[goods1,goods2,...] -->
        <div v-else class="slider">
          <RouterLink v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <!-- 上一張 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <!-- 下一張 -->
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- active 當前圖示亮點 -->
      <span
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ active: index === i }"
        @click="index = i"
      ></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue';
export default {
  name: 'XtxCarousel',
  props: {
    // 輪播圖資料
    sliders: {
      type: Array,
      default: () => [],
    },
    // 是否自動輪播
    autoPlay: {
      type: Boolean,
      default: false,
    },
    // 間隔時間
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    // 控制顯示圖片的索引值
    const index = ref(0);

    // 1.自動輪播圖的邏輯
    let timer = null;
    const autoPlayFn = () => {
      // 防止定時器重複添加
      clearInterval(timer);
      // 自動播放, 每隔多久切換索引值
      timer = setInterval(() => {
        index.value++;
        if (index.value >= props.sliders.length) {
          index.value = 0;
        }
      }, props.duration);
    };
    // 需要監聽sliders資料變化, 判斷如果有資料且autoPlay是true
    watch(
      () => props.sliders,
      newValue => {
        if (newValue.length && props.autoPlay) {
          autoPlayFn();
        }
      },
      { immediate: true }
    );

    // 2.滑鼠進入時暫停 離開時開啟自動播放 (有開啟條件)
    const stop = () => {
      if (timer) clearInterval(timer);
    };
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn();
      }
    };

    // 3.點擊 上一張 下一張切換圖片
    const toggle = step => {
      const newIndex = index.value + step;
      // 超出範圍情況
      if (newIndex > props.sliders.length - 1) {
        index.value = 0;
        return;
      }
      if (newIndex < 0) {
        index.value = props.sliders.length - 1;
        return;
      }
      // 正常情況
      index.value = newIndex;
    };

    // 4.元件卸載時, 清除定時器
    onUnmounted(() => {
      clearInterval(timer);
    });

    return { index, stop, start, toggle };
  },
};
</script>

<style lang="scss" scoped>
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
// 輪播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: $priceColor;
      margin-top: 15px;
    }
  }
}
</style>
