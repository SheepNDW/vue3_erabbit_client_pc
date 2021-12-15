<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌:</div>
      <div class="body">
        <a
          @click="changeBrand(item.id)"
          :class="{ active: item.id === filterData.brands.selectedBrand }"
          href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}:</div>
      <div class="body">
        <a
          @click="changeProp(item, prop.id)"
          :class="{ active: prop.id === item.selectedProp }"
          href="javascript:;"
          v-for="prop in item.properties"
          :key="prop.id"
        >
          {{ prop.name }}
        </a>
      </div>
    </div>
  </div>
  <!-- 骨架效果 -->
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { findSubCategoryFilter } from '@/api/category';
export default {
  name: 'SubFilter',
  setup(props, { emit }) {
    const route = useRoute();
    // 監聽二級類目ID的變化獲取篩選資料
    const filterData = ref(null);
    const filterLoading = ref(false);
    watch(
      () => route.params.id,
      newValue => {
        // 變化後id有值 且 處於二級類目路由下
        if (newValue && `/category/sub/${newValue}` === route.path) {
          filterLoading.value = true;
          // 發請求獲取資料
          findSubCategoryFilter(route.params.id).then(data => {
            // 每一組可選的篩選條件缺失 "全部" 條件, 處理下資料加上全部
            // 給每一組資料加上加上一個選中的ID
            // 1. 品牌
            data.result.brands.selectedBrand = null;
            data.result.brands.unshift({ id: null, name: '全部' });
            // 2. 屬性
            data.result.saleProperties.forEach(item => {
              item.selectedProp = null;
              item.properties.unshift({ id: null, name: '全部' });
            });
            // 設置修改後的資料
            filterData.value = data.result;
            filterLoading.value = false;
          });
        }
      },
      { immediate: true }
    );

    // 獲取篩選參數的函式
    const getFilterParams = () => {
      const obj = { brandId: null, attrs: [] };
      // 品牌
      obj.brandId = filterData.value.brands.selectedBrand;
      // 銷售屬性
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedProp) {
          const prop = item.properties.find(prop => prop.id === item.selectedProp);
          obj.attrs.push({ groupName: item.name, propertyName: prop.name });
        }
      });
      // 參考資料: {brandId:'', attrs:[ {groupName:''}, {propertyName:''},...]}
      if (obj.attrs.length === 0) obj.attrs = null;
      return obj;
    };

    // 1.記錄當前選擇的品牌
    const changeBrand = brandId => {
      if (filterData.value.brands.selectedBrand === brandId) return;
      filterData.value.brands.selectedBrand = brandId;
      emit('filter-change', getFilterParams());
    };
    // 2.記錄你選擇的銷售屬性
    const changeProp = (item, propId) => {
      if (item.selectedProp === propId) return;
      item.selectedProp = propId;
      emit('filter-change', getFilterParams());
    };

    return { filterData, filterLoading, changeBrand, changeProp };
  },
};
</script>

<style lang="scss" scoped>
// 篩選區
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: $xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>
