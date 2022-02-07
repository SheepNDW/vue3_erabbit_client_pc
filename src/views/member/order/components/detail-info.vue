<template>
  <div class="order-info">
    <!-- 商品列表 -->
    <h3>訂單商品</h3>
    <table class="goods-table">
      <thead>
        <tr>
          <th width="400">商品信息</th>
          <th>單價</th>
          <th>數量</th>
          <th>小計</th>
          <th>實付</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.skus" :key="item.id">
          <td>
            <a href="javascript:;" class="product">
              <img :src="item.image" alt="" />
              <div class="info">
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="attrs ellipsis">{{ item.attrsText }}</p>
              </div>
            </a>
          </td>
          <td>¥{{ item.curPrice }}</td>
          <td>{{ item.quantity }}</td>
          <td>¥{{ item.realPay }}</td>
          <td>¥{{ item.realPay }}</td>
        </tr>
      </tbody>
    </table>
    <!-- 收貨信息 -->
    <h3>收貨信息</h3>
    <div class="info-box">
      <dl>
        <dt>收<i></i>貨<i></i>人：</dt>
        <dd>{{ order.receiverContact }}</dd>
      </dl>
      <dl>
        <dt>聯絡方式：</dt>
        <dd>{{ order.receiverMobile }}</dd>
      </dl>
      <dl>
        <dt>收貨地址：</dt>
        <dd>{{ order.receiverAddress }}</dd>
      </dl>
    </div>
    <!-- 支付方式及送貨時間 -->
    <h3>支付方式及送貨時間</h3>
    <div class="info-box">
      <dl>
        <dt>支付方式：</dt>
        <dd>180****1849</dd>
      </dl>
      <dl>
        <dt>送貨時間：</dt>
        <dd>週休、例假日送貨(適合於家庭地址)</dd>
      </dl>
    </div>
    <!-- 發票資訊 -->
    <h3>發票資訊</h3>
    <div class="info-box">
      <dl>
        <dt>發票類型：</dt>
        <dd>電子發票</dd>
      </dl>
      <dl>
        <dt>發票内容：</dt>
        <dd>日用品</dd>
      </dl>
      <dl>
        <dt>發票抬頭：</dt>
        <dd>個人</dd>
      </dl>
    </div>
    <!-- 訂單信息 -->
    <h3>訂單信息</h3>
    <div class="info-box">
      <dl>
        <dt>訂單編號：</dt>
        <dd>線上支付</dd>
      </dl>
      <dl>
        <dt>下單時間：</dt>
        <dd>{{ order.createTime }}</dd>
      </dl>
    </div>
    <!-- 匯總信息 -->
    <div class="sum-info">
      <div class="info">
        <div class="item">
          <label>商品件數：</label>
          <span>{{ order.totalNum }}件</span>
        </div>
        <div class="item">
          <label>商品總價：</label>
          <span>¥{{ order.totalMoney }}</span>
        </div>
        <div class="item">
          <label>運<i></i>費：</label>
          <span>{{ order.postFee }}</span>
        </div>
        <div class="item">
          <label>應付總額：</label>
          <span class="price">¥{{ order.payMoney }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderInfo',
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.order-info {
  padding: 0 50px;
  h3 {
    font-weight: normal;
    font-size: 16px;
    padding: 25px 5px;
  }
}
// 商品表格
.goods-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0 auto;
  th {
    font-weight: normal;
    line-height: 60px;
    background: #f5f5f5;
    &:first-child {
      text-align: left;
      padding-left: 20px;
    }
  }
  td {
    border-bottom: 1px solid #f5f5f5;
    text-align: center;
    &:first-child {
      padding-left: 20px;
      border-left: 1px solid #f5f5f5;
    }
    &:last-child {
      border-right: 1px solid #f5f5f5;
    }
  }
  .product {
    display: flex;
    padding: 20px 0;
    img {
      width: 70px;
      height: 70px;
      border: 1px solid #f5f5f5;
    }
    .info {
      align-self: center;
      padding-left: 20px;
      text-align: left;
      p {
        margin-bottom: 5px;
        width: 280px;
      }
      .attrs {
        color: #999;
      }
    }
  }
}
// 信息盒子
.info-box {
  border: 1px solid #f5f5f5;
  padding: 20px;
  dl {
    display: flex;
    line-height: 30px;
    dt {
      width: 80px;
      color: #999;
      font-size: 14px;
      i {
        display: inline-block;
        width: 0.5em;
      }
    }
    dd {
      flex: 1;
    }
  }
}
// 匯總信息
.sum-info {
  padding: 30px 30px 100px 30px;
  overflow: hidden;
  .info {
    width: 250px;
    height: 160px;
    float: right;
    font-size: 16px;
    .item {
      line-height: 40px;
      display: flex;
      label {
        width: 90px;
        i {
          display: inline-block;
          width: 2em;
        }
      }
      span {
        flex: 1;
        text-align: right;
        padding-right: 30px;
        &.price {
          font-size: 20px;
          color: $priceColor;
        }
      }
    }
  }
}
</style>
