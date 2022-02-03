<template>
  <div class="member-order">
    <!-- tab元件 -->
    <XtxTabs v-model="activeName">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></XtxTabsPanel>
    </XtxTabs>
    <!-- 訂單列表 -->
    <div class="order-list">
      <OrderItem v-for="item in orderList" :key="item.id" :order="item" />
    </div>

    <!-- 分頁元件 -->
    <XtxPagination />
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { orderStatus } from '@/api/constants.js';
import OrderItem from './components/order-item.vue';
import { findOrderList } from '@/api/order';
export default {
  name: 'MemberOrder',
  components: { OrderItem },
  setup() {
    const activeName = ref('all');

    // 獲取資料
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      orderState: 0,
    });
    const orderList = ref([]);
    findOrderList(reqParams).then(data => {
      orderList.value = data.result.items;
    });

    return { activeName, orderStatus, orderList };
  },
};
</script>

<style lang="scss" scoped>
.member-oreder {
  height: 100%;
  background-color: #fff;
}
.order-list {
  background: #fff;
  padding: 20px;
}
</style>
