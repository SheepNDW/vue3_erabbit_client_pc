<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? '同類商品推薦' : '猜你喜歡' }}</span>
    </div>
    <!-- 此處使用改造後的xtx-carousel.vue -->
    <XtxCarousel :sliders="sliders" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { findRelevantGoods } from '@/api/product';
export default {
  // 同類推薦，猜你喜歡
  name: 'GoodsRelevant',
  props: {
    goodsId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // 最終需要的資料是 sliders 提供給輪播圖使用
    // 資料結構: sliders = [[4個],[4個],[4個],[4個]]
    const sliders = ref([]);
    findRelevantGoods({ id: props.goodsId }).then(data => {
      // data.result 商品列表, 資料結構: [16個]
      // 將 data.result 資料賦值給 sliders 並保證資料結構正確
      const pageSize = 4;
      const pageCount = Math.ceil(data.result.length / pageSize);
      for (let i = 0; i < pageCount; i++) {
        sliders.value.push(data.result.slice(pageSize * i, pageSize * (i + 1)));
      }
    });
    return { sliders };
  },
};
</script>

<style lang="scss" scoped>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid $xtxColor;
      border-right: 4px solid $xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten($xtxColor, 40%);
      }
    }
  }
}
// 注意：vue3.0使用深度作用選擇器寫法 :deep(選擇器)
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: $xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
