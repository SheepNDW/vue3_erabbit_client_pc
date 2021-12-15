<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默認排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
        >最高人氣</a
      >
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
        >評論最多</a
      >
      <a @click="changeSort('price')" href="javascript:;">
        價格排序
        <i
          class="arrow up"
          :class="{
            active: sortParams.sortField === 'price' && sortParams.sortMethod === 'asc',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active: sortParams.sortField === 'price' && sortParams.sortMethod === 'desc',
          }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory"
        >僅顯示有貨商品</XtxCheckbox
      >
      <XtxCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount"
        >僅顯示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';
export default {
  name: 'SubSort',
  setup(props, { emit }) {
    // 實現交互 (實現交互的資料和後臺保持一致)
    // 1. 明確交互資料
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null, // publishTime,orderNum,price,evaluateNum
      sortMethod: null, // asc為正序 desc為倒序 默認為desc
    });
    // 2. 提供給模板使用
    // 3. 需要綁定按鈕的點擊事件修改排序字段和排序方法
    const changeSort = sortField => {
      if (sortField === 'price') {
        sortParams.sortField = sortField;
        // 處理排序
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'desc';
        } else {
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc';
        }
      } else {
        // 如果已經選中阻止執行
        if (sortParams.sortField === sortField) return;
        sortParams.sortField = sortField;
        sortParams.sortMethod = null;
      }
      // 觸發 sort-change 事件
      emit('sort-change', sortParams);
    };
    const changeCheck = () => {
      // 觸發 sort-change 事件
      emit('sort-change', sortParams);
    };

    return { sortParams, changeSort, changeCheck };
  },
};
</script>

<style lang="scss" scoped>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: $xtxColor;
        border-color: $xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: $xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: $xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
