<template>
  <div class="order-detail-page" v-if="order">
    <!-- 頭部 -->
    <DetailAction :order="order" />
    <!-- 進度 -->
    <DetailSteps :order="order" />
    <!-- 物流 -->
    <suspense>
      <!-- 元件加載完畢 -->
      <template #default>
        <DetailLogistics v-if="[3, 4, 5].includes(order.orderState)" :order="order" />
      </template>
      <!-- 元件加載中顯示 -->
      <template #fallback>
        <div class="loading">loading...</div>
      </template>
    </suspense>
    <!-- 信息 -->
    <DetailInfo :order="order" />
  </div>
</template>

<script>
import { ref } from 'vue';
import DetailAction from './components/detail-action';
import DetailSteps from './components/detail-steps';
import DetailLogistics from './components/detail-logistics';
import DetailInfo from './components/detail-info';
import { findOrderDetail } from '@/api/order';
import { useRoute } from 'vue-router';
export default {
  name: 'MemberDetail',
  components: { DetailAction, DetailSteps, DetailLogistics, DetailInfo },
  setup() {
    const route = useRoute();
    const order = ref(null);
    findOrderDetail(route.params.id).then(data => {
      order.value = data.result;
    });

    return { order };
  },
};
</script>

<style lang="scss" scoped>
.order-detail-page {
  background-color: #fff;
  height: 100%;
}
.loading {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
}
</style>
