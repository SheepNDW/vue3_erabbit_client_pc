<template>
  <div class="sub-category">
    <div class="container">
      <!-- 麵包屑 -->
      <SubBread />
      <!-- 篩選區 -->
      <SubFilter @filter-change="filterChange" />
      <!-- 商品面板 (排序 + 列表) -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 無限載入元件 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue';
import SubFilter from './components/sub-filter.vue';
import SubSort from './components/sub-sort.vue';
import GoodsItem from './components/goods-item.vue';
import { ref, watch } from 'vue';
import { findSubCategoryGoods } from '@/api/category';
import { useRoute } from 'vue-router';
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup() {
    const route = useRoute();
    // 載入中
    const loading = ref(false);
    // 是否載入完畢
    const finished = ref(false);
    // 商品列表資料
    const goodsList = ref([]);
    // 請求參數
    let reqParams = {
      page: 1,
      pageSize: 20,
    };

    const getData = () => {
      loading.value = true;
      // 設置二級分類的ID
      reqParams.categoryId = route.params.id;
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 獲取資料成功
        if (result.items.length) {
          // 有資料就追加資料
          goodsList.value.push(...result.items);
          // 把page改成下一頁頁碼
          reqParams.page++;
        } else {
          // 沒有資料代表載入完成
          finished.value = true;
        }
        loading.value = false;
      });
    };
    // 在更改二級分類的時候 需要重新載入資料
    watch(
      () => route.params.id,
      newValue => {
        if (newValue && `/category/sub/${newValue}` === route.path) {
          finished.value = false;
          goodsList.value = []; // 列表清空, 加載更多元件就會頂上來到可視區, 觸發getData
          reqParams = {
            page: 1,
            pageSize: 20,
          };
        }
      }
    );

    // 1. 更改排序元件的篩選資料, 重新請求
    const sortChange = sortParams => {
      finished.value = false;
      // 合併請求參數, 保留之前參數
      reqParams = { ...reqParams, ...sortParams };
      reqParams.page = 1;
      goodsList.value = [];
    };
    // 2. 更改篩選元件的篩選資料, 重新請求
    const filterChange = filterParams => {
      finished.value = false;
      // 合併請求參數, 保留之前參數
      reqParams = { ...reqParams, ...filterParams };
      reqParams.page = 1;
      goodsList.value = [];
    };

    return { loading, finished, getData, goodsList, sortChange, filterChange };
  },
};
</script>

<style lang="scss" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
