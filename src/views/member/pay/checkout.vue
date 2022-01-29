<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首頁</XtxBreadItem>
        <XtxBreadItem to="/cart">購物車</XtxBreadItem>
        <XtxBreadItem>填寫訂單</XtxBreadItem>
      </XtxBread>
      <div class="wrapper" v-if="order">
        <!-- 取貨地址 -->
        <h3 class="box-title">取貨地址</h3>
        <div class="box-body">
          <!-- 取貨地址元件 -->
          <CheckoutAddress @change="changeAddress" :list="order.userAddresses" />
        </div>
        <!-- 商品資訊 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">單價</th>
                <th width="170">數量</th>
                <th width="170">小計</th>
                <th width="170">實付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.goods" :key="item.skuId">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="item.picture" alt="" />
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ item.price }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.totalPrice }}</td>
                <td>&yen;{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送時間 -->
        <h3 class="box-title">配送時間</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送貨時間：週一至週日</a>
          <a class="my-btn" href="javascript:;">工作日送貨：週一至週五</a>
          <a class="my-btn" href="javascript:;">六日、國定假日送貨：週六至週日</a>
        </div>
        <!-- 付款方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">線上支付</a>
          <a class="my-btn" href="javascript:;">貨到付款</a>
          <span style="color: #999">貨到付款需付5元手續費</span>
        </div>
        <!-- 金額明細 -->
        <h3 class="box-title">金額明細</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件數：</dt>
              <dd>{{ order.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品總價：</dt>
              <dd>¥{{ order.summary.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>運<i></i>費：</dt>
              <dd>¥{{ order.summary.postFee }}</dd>
            </dl>
            <dl>
              <dt>應付總額：</dt>
              <dd class="price">¥{{ order.summary.totalPayPrice }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交訂單 -->
        <div class="submit">
          <XtxButton @click="submitOrderFn" type="primary">提交訂單</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckoutAddress from './components/checkout-address.vue';
import { createOrder, submitOrder } from '@/api/order';
import { reactive, ref } from 'vue';
import Message from '@/components/library/Message';
import { useRouter } from 'vue-router';
export default {
  name: 'XtxPayCheckoutPage',
  components: { CheckoutAddress },
  setup() {
    // 結算功能-生成訂單-訂單信息
    const order = ref(null);
    createOrder().then(data => {
      order.value = data.result;
      reqParams.goods = data.result.goods.map(({ skuId, count }) => ({ skuId, count }));
    });

    // 接收取貨地址ID
    const changeAddress = id => {
      reqParams.addressId = id;
    };

    // 結算功能-提交訂單-提交信息
    const reqParams = reactive({
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: '',
      // 商品信息, 獲取訂單信息後設置
      goods: [],
      // 取貨地址, 切換取貨地址或是默認都會設置
      addressId: null,
    });

    // 提交訂單
    const router = useRouter();
    const submitOrderFn = () => {
      // 檢查是否有選擇取貨地址
      if (!reqParams.addressId) return Message({ text: '請選擇取貨地址' });

      submitOrder(reqParams).then(data => {
        // 提交訂單成功
        Message({ type: 'success', text: '提交訂單成功! ' });
        // 跳轉至支付頁
        router.push(`/member/pay?orderId=${data.result.id}`);
      });
    };

    return { order, changeAddress, reqParams, submitOrderFn };
  },
};
</script>

<style lang="scss" scoped>
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
