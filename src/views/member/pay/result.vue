<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首頁</XtxBreadItem>
        <XtxBreadItem to="/cart">購物車</XtxBreadItem>
        <XtxBreadItem>支付結果</XtxBreadItem>
      </XtxBread>
      <!-- 支付結果 -->
      <div class="pay-result">
        <span v-if="$route.query.payResult" class="iconfont icon-queren2 green"></span>
        <span v-else class="iconfont icon-shanchu red"></span>
        <p class="tit">訂單支付{{ $route.query.payResult ? '成功' : '失敗' }}</p>
        <p class="tip">我們將盡快為您發貨，收貨期間請保持手機暢通</p>
        <p>支付方式：<span>支付宝支付</span></p>
        <p>
          支付金額：<span class="red">¥{{ order?.payMoney }}</span>
        </p>
        <div class="btn">
          <XtxButton
            @click="$router.push('/member/order')"
            type="primary"
            style="margin-right: 20px"
            >查看訂單</XtxButton
          >
          <XtxButton @click="$router.push('/')" type="gray">進入首頁</XtxButton>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：小兔鮮兒不會以訂單異常、系統升級為由要求您點擊任何網址鏈接進行退款操作，保護資產、謹慎操作。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { findOrderDetail } from '@/api/order';
import { useRoute } from 'vue-router';
export default {
  name: 'XtxPayResultPage',
  setup() {
    const route = useRoute();
    const order = ref(null);
    findOrderDetail(route.query.orderId).then(data => {
      order.value = data.result;
    });
    return { order };
  },
};
</script>

<style lang="scss" scoped>
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: $priceColor;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
