<template>
  <XtxDialog title="取消訂單" v-model:visible="visibleDialog">
    <!-- 取消原因列表 -->
    <div class="cancel-info">
      <p>取消訂單後，本單享有的優惠可能會一並取消，是否繼續？</p>
      <p class="tip">請選擇取消訂單的原因（必選）：</p>
      <div class="btn">
        <a
          @click="curText = item"
          v-for="item in cancelReason"
          :key="item"
          href="javascript:;"
          :class="{ active: curText === item }"
        >
          {{ item }}
        </a>
      </div>
    </div>
    <!-- 按鈕操作 -->
    <template #footer>
      <XtxButton type="gray" @click="visibleDialog = false" style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton type="primary" @click="submit">確認</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref } from 'vue';
import { cancelReason } from '@/api/constants';
import Message from '@/components/library/Message';
import { cancelOrder } from '@/api/order';
export default {
  name: 'OrderCancel',
  setup() {
    const visibleDialog = ref(false);
    const currOrder = ref(null);
    const open = order => {
      visibleDialog.value = true;
      currOrder.value = order;
      curText.value = '';
    };
    // 選中的原因label
    const curText = ref('');

    // 確認函式
    const submit = () => {
      if (!curText.value) return Message({ text: '請選擇取消原因! ' });
      cancelOrder({ orderId: currOrder.value.id, cancelReason: curText.value }).then(
        () => {
          Message({ type: 'success', text: '取消訂單成功! ' });
          currOrder.value.orderState = 6;
          visibleDialog.value = false;
        }
      );
    };

    return { visibleDialog, cancelReason, curText, open, submit };
  },
};
</script>

<style lang="scss" scoped>
.xtx-dialog :deep(.wrapper) {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: $xtxColor;
      }
    }
  }
}
</style>
