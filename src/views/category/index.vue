<template>
  <div class="top-category">
    <div class="container">
      <!-- 麵包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首頁</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">
            {{ topCategory.name }}
          </XtxBreadItem>
        </Transition>
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
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { findBanner } from '@/api/home';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import GoodsItem from './components/goods-item.vue';
import { findTopCategory } from '@/api/category';
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

    // 獲取各個子類目下的推薦商品
    const subList = ref([]);
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children;
      });
    };
    watch(
      () => route.params.id,
      newValue => {
        // newValue && getSubList(); 加上一個嚴謹的判斷: 在頂級類目下才發送請求
        if (newValue && `/category/${newValue}` === route.path) getSubList();
      },
      { immediate: true }
    );

    return { sliders, topCategory, subList };
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
