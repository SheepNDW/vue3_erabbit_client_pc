<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首頁</XtxBreadItem>
        <XtxBreadItem>購物車</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <XtxCheckbox
                  @change="checkAll"
                  :modelValue="$store.getters['cart/isCheckAll']"
                  >全選</XtxCheckbox
                >
              </th>
              <th width="400">商品資訊</th>
              <th width="220">單價</th>
              <th width="180">數量</th>
              <th width="180">小計</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="$store.getters['cart/validList'].length === 0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
            <tr v-for="goods in $store.getters['cart/validList']" :key="goods.skuId">
              <td>
                <XtxCheckbox
                  @change="$event => checkOne(goods.skuId, $event)"
                  :modelValue="goods.selected"
                />
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`">
                    <img :src="goods.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <!-- 選擇規格元件 -->
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
                <p v-if="goods.price - goods.nowPrice > 0">
                  比加入時降價
                  <span class="red">&yen;{{ goods.price - goods.nowPrice }}</span>
                </p>
              </td>
              <td class="tc">
                <XtxNumbox :modelValue="goods.count" />
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (Math.round(goods.nowPrice * 100) * goods.count) / 100 }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <a @click="deleteCart(goods.skuId)" class="green" href="javascript:;"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 無效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr v-for="goods in $store.getters['cart/invalidList']" :key="goods.skuId">
              <td><XtxCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`">
                    <img :src="goods.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <p class="attr">{{ goods.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
              </td>
              <td class="tc">{{ goods.count }}</td>
              <td class="tc">
                <p>&yen;{{ (Math.round(goods.nowPrice * 100) * goods.count) / 100 }}</p>
              </td>
              <td class="tc">
                <p>
                  <a @click="deleteCart(goods.skuId)" class="green" href="javascript:;"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作欄 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']"
            >全選</XtxCheckbox
          >
          <a @click="batchDeleteCart" href="javascript:;">刪除商品</a>
          <a href="javascript:;">移入收藏夾</a>
          <a @click="batchDeleteCart(true)" href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters['cart/validTotal'] }} 件商品，已選擇
          {{ $store.getters['cart/selectedTotal'] }} 件，商品合計：
          <span class="red">¥{{ $store.getters['cart/selectedAmount'] }}</span>
          <XtxButton type="primary">下單結帳</XtxButton>
        </div>
      </div>
      <!-- 猜你喜歡 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script>
import GoodRelevant from '@/views/goods/components/goods-relevant';
import CartNone from './components/cart-none';
import { useStore } from 'vuex';
import Message from '@/components/library/Message';
import Confirm from '@/components/library/Confirm';
export default {
  name: 'XtxCartPage',
  components: { GoodRelevant, CartNone },
  setup() {
    const store = useStore();

    // 單選
    const checkOne = (skuId, selected) => {
      store.dispatch('cart/updateCart', { skuId, selected });
    };

    // 全選
    const checkAll = selected => {
      store.dispatch('cart/checkAllCart', selected);
    };

    // 刪除
    const deleteCart = skuId => {
      Confirm({ text: '您確認要從購物車刪除該商品嗎?' })
        .then(() => {
          store.dispatch('cart/deleteCart', skuId).then(() => {
            Message({ type: 'success', text: '刪除成功! ' });
          });
        })
        .catch(() => {});
    };

    // 批量刪除選中商品, 也支持清空無效商品
    const batchDeleteCart = isClear => {
      Confirm({ text: `您確認要從購物車刪除${isClear ? '失效的' : '已選中的'}商品嗎?` })
        .then(() => {
          store.dispatch('cart/batchDeleteCart', isClear);
        })
        .catch(() => {});
    };

    return { checkOne, checkAll, deleteCart, batchDeleteCart };
  },
};
</script>

<style lang="scss" scoped>
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: $priceColor;
}
.green {
  color: $xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
