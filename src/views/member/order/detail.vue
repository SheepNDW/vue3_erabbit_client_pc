<template>
  <div class="order-detail-page" v-if="order">
    <!-- 頭部 -->
    <DetailAction :order="order" />
    <!-- 進度 -->
    <DetailSteps :order="order" />
    <!-- 物流 -->
    <!-- 信息 -->
  </div>
</template>

<script>
import { ref } from 'vue';
import DetailAction from './components/detail-action.vue';
import DetailSteps from './components/detail-steps.vue';
import { findOrderDetail } from '@/api/order';
import { useRoute } from 'vue-router';
export default {
  name: 'MemberDetail',
  components: { DetailAction, DetailSteps },
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
</style>
