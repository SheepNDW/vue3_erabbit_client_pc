<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <GoodsSku @change="changeSku" v-else :skuId="skuId" :goods="goods" />
      <XtxButton
        @click="submit"
        v-if="!loading"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        >確認</XtxButton
      >
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { getGoodsSku } from '@/api/cart';
import GoodsSku from '@/views/goods/components/goods-sku';
export default {
  name: 'CartSku',
  components: { GoodsSku },
  props: {
    attrsText: {
      type: String,
      default: '',
    },
    skuId: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const goods = ref(null);
    const loading = ref(false);
    // 打開
    const open = () => {
      visible.value = true;
      // 獲取商品資料 (specs, skus)
      loading.value = true;
      getGoodsSku(props.skuId).then(data => {
        goods.value = data.result;
        loading.value = false;
      });
    };
    // 關閉
    const close = () => {
      visible.value = false;
    };
    // 切換
    const toggle = () => {
      visible.value ? close() : open();
    };
    // 點擊其他地方關閉
    const target = ref(null);
    onClickOutside(target, () => {
      close();
    });

    // 監聽sku改變的函式, 記錄sku訊息
    const currSku = ref(null);
    const changeSku = sku => {
      currSku.value = sku;
    };

    // 點擊確認的時候, 更改後的sku訊息提交給父元件(購物車元件)
    const submit = () => {
      // 當你currSku有值, 且skuId和默認的skuId不同
      if (currSku.value && currSku.value.skuId && currSku.value.skuId !== props.skuId) {
        emit('change', currSku.value);
        close();
      }
    };

    return { visible, toggle, target, goods, loading, changeSku, submit };
  },
};
</script>

<style lang="scss" scoped>
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid $xtxColor;
    box-shadow: 2px 2px 4px lighten($xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-left: 1px solid $xtxColor;
      border-top: 1px solid $xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
