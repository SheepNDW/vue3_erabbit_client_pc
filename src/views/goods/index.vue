<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 麵包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首頁</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">
          {{ goods.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">
          {{ goods.categories[0].name }}
        </XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <!-- sku元件 -->
          <GoodsSku :goods="goods" @change="changeSku" />
          <!-- 數量選擇元件 -->
          <XtxNumbox label="数量" v-model="num" :max="goods.inventory" />
          <!-- 按鈕元件 -->
          <XtxButton @click="insertCart()" type="primary" style="margin-top: 20px"
            >加入購物車</XtxButton
          >
        </div>
      </div>
      <!-- 商品推薦 -->
      <GoodsRelevant />
      <!-- 商品詳情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+評價 -->
          <GoodsTabs />
          <!-- 注意事項 -->
          <GoodsWarn />
        </div>
        <!-- 24熱榜+週榜 -->
        <div class="goods-aside">
          <GoodsHot />
          <GoodsHot :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, provide, ref, watch } from 'vue';
import { findGoods } from '@/api/product';
import { useRoute } from 'vue-router';
import GoodsRelevant from './components/goods-relevant.vue';
import GoodsImage from './components/goods-image.vue';
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';
import GoodsSku from './components/goods-sku.vue';
import GoodsTabs from './components/goods-tabs.vue';
import GoodsHot from './components/goods-hot.vue';
import GoodsWarn from './components/goods-warn.vue';
import { useStore } from 'vuex';
import Message from '@/components/library/Message';
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
    GoodsWarn,
  },
  setup() {
    // 1. 獲取商品詳情, 進行渲染
    const goods = useGoods();
    const changeSku = sku => {
      // 修改商品的現價 原價 庫存資訊
      if (sku.skuId) {
        goods.value.prive = sku.price;
        goods.value.OldPrice = sku.OldPrice;
        goods.value.inventory = sku.inventory;
      }
      // 記錄選擇後的sku, 可能有資料也可能是空物件{}
      currSku.value = sku;
    };

    // 提供goods資料給後代元件使用
    provide('goods', goods);

    // 選擇的數量
    const num = ref(1);

    // 加入購物車
    const store = useStore();
    const currSku = ref(null);
    const insertCart = () => {
      if (currSku.value && currSku.value.skuId) {
        // id skuId name attrsText picture price nowPrice selected stock count isEffective
        const { skuId, specsText: attrsText, inventory: stock } = currSku.value;
        const { id, name, price, mainPictures } = goods.value;
        store
          .dispatch('cart/insertCart', {
            skuId,
            attrsText,
            stock,
            id,
            name,
            price,
            nowPrice: price,
            picture: mainPictures[0],
            selected: true,
            isEffective: true,
            count: num.value,
          })
          .then(() => {
            Message({ type: 'success', text: '添加成功! ' });
          });
      } else {
        Message({ text: '請選擇完整的規格' });
      }
    };

    return { goods, changeSku, num, insertCart };
  },
};
// 獲取商品詳情
const useGoods = () => {
  // 出現路由地址商品id發生變化, 但不會重新初始化元件
  const goods = ref(null);
  const route = useRoute();
  watch(
    () => route.params.id,
    newValue => {
      if (newValue && `/product/${newValue}` === route.path) {
        findGoods(route.params.id).then(data => {
          // 讓商品資料為null 然後使用v-if的元件能重新銷毀和創建
          goods.value = null;
          nextTick(() => {
            goods.value = data.result;
          });
        });
      }
    },
    { immediate: true }
  );

  return goods;
};
</script>

<style lang="scss" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
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
// .goods-tabs {
//   min-height: 600px;
//   background: #fff;
// }
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
