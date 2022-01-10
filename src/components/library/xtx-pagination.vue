<template>
  <div class="xtx-pagination">
    <a
      @click="changePager(myCurrentPage - 1)"
      v-if="myCurrentPage > 1"
      href="javascript:;"
      >上一頁</a
    >
    <a v-else href="javascript:;" class="disabled">上一頁</a>
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      @click="changePager(i)"
      v-for="i in pager.btnArr"
      :key="i"
      :class="{ active: i === myCurrentPage }"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      @click="changePager(myCurrentPage + 1)"
      v-if="myCurrentPage < pager.pageCount"
      href="javascript:;"
      >下一頁</a
    >
    <a v-else href="javascript:;" class="disabled">下一頁</a>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue';
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    // 需要資料:
    // 1. 約定按鈕個數 5 個, 如果想成為動態的需要設置成響應式
    const btnCount = 5;
    // 2. 當前顯示的頁碼
    const myCurrentPage = ref(1);
    // 3. 總頁數 = 總條數 / 每頁條數 向上取整
    const myTotal = ref(100);
    const myPageSize = ref(10);

    // 其他資料 (總頁數, 起始按鈕, 結束按鈕, 按鈕Array) 依賴上面資料得到
    const pager = computed(() => {
      // 總頁數
      const pageCount = Math.ceil(myTotal.value / myPageSize.value);
      // 按鈕個數和當前頁碼 ===> 起始按鈕, 結束按鈕, 按鈕Array
      // 1. 理想情況下:
      const offset = Math.floor(btnCount / 2);
      let start = myCurrentPage.value - offset;
      let end = start + btnCount - 1;
      // 2. 如果起始頁碼小於0 需要處理
      if (start < 1) {
        start = 1;
        end = start + btnCount - 1 > pageCount ? pageCount : start + btnCount - 1;
      }
      // 3. 如果結束頁碼大於總頁需要處理
      if (end > pageCount) {
        end = pageCount;
        start = end - btnCount + 1 < 1 ? 1 : end - btnCount + 1;
      }
      const btnArr = [];
      for (let i = start; i <= end; i++) {
        btnArr.push(i);
      }

      return {
        pageCount,
        btnArr,
        start,
        end,
      };
    });

    // 監聽props的變化, 更新元件內部資料
    watch(
      props,
      () => {
        myTotal.value = props.total;
        myPageSize.value = props.pageSize;
        myCurrentPage.value = props.currentPage;
      },
      { immediate: true }
    );

    // 切換分頁函式
    const changePager = page => {
      myCurrentPage.value = page;
      // 通知父元件
      emit('current-change', page);
    };

    return { myCurrentPage, pager, changePager };
  },
};
</script>

<style lang="scss" scoped>
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: $xtxColor;
    }
    &.active {
      background: $xtxColor;
      color: #fff;
      border-color: $xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
