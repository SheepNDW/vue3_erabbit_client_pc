<template>
  <div class="top-category">
    <div class="container">
      <!-- 麵包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首頁</XtxBreadItem>
        <XtxBreadItem>{{ topCategory.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 輪播圖 -->
      <XtxCarousel :sliders="sliders" style="height: 500px" />
      <!-- 全部分類 -->
      <div class="sub-list">
        <h3>全部分類</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各分類推薦商品 -->
      <div class="ref-goods">
        <div class="head">
          <h3>- 海鲜 -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="i in 5" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { findBanner } from '@/api/home';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import GoodsItem from './components/goods-item.vue';
export default {
  name: 'TopCategory',
  components: { GoodsItem },
  setup() {
    // 輪播圖
    const sliders = ref([]);
    findBanner().then(data => {
      sliders.value = data.result;
    });

    // 麵包屑 + 所有子分類 ==> vuex
    const store = useStore();
    const route = useRoute();
    const topCategory = computed(() => {
      let cate = {};
      // 當前頂級分類 === 根據路由上的ID去vuex中的category模組的list裡找
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id;
      });
      if (item) cate = item;
      return cate;
    });

    return { sliders, topCategory };
  },
};
</script>

<style lang="scss" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
  // 推薦商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
