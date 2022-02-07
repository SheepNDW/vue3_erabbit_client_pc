<template>
  <div class="detail-steps">
    <XtxSteps :active="order.orderState === 6 ? 1 : order.orderState">
      <XtxStepsItem title="提交訂單" :desc="order.createTime" />
      <XtxStepsItem title="付款成功" :desc="order.payTime" />
      <XtxStepsItem title="商品發貨" :desc="order.consignTime" />
      <XtxStepsItem title="確認收貨" :desc="order.endTime" />
      <XtxStepsItem title="訂單完成" :desc="order.evaluationTime" />
    </XtxSteps>
  </div>
</template>

<script>
export default {
  name: 'DetailSteps',
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-steps {
  padding: 20px;
}
</style>
