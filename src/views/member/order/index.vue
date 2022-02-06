<template>
  <div class="member-order">
    <!-- tab元件 -->
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></XtxTabsPanel>
    </XtxTabs>
    <!-- 訂單列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暫無資料</div>
      <OrderItem
        @on-cancel="handlerCancel"
        @on-delete="handlerDelete"
        @on-confirm="handlerConfirm"
        @on-logistics="handlerLogistics"
        v-for="item in orderList"
        :key="item.id"
        :order="item"
      />
    </div>

    <!-- 分頁元件 -->
    <XtxPagination
      v-if="total > 0"
      :current-page="reqParams.page"
      :page-size="reqParams.pageSize"
      :total="total"
      @current-change="reqParams.page = $event"
    />

    <!-- 取消原因元件 -->
    <OrderCancel ref="orderCancelCom" />
    <!-- 查看物流元件 -->
    <OrderLogistics ref="orderLogisticsCom" />
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';
import { orderStatus } from '@/api/constants.js';
import { confirmOrder, deleteOrder, findOrderList } from '@/api/order';
import OrderItem from './components/order-item.vue';
import OrderCancel from './components/order-cancel.vue';
import OrderLogistics from './components/order-logistics.vue';
import Confirm from '@/components/library/Confirm';
import Message from '@/components/library/Message';
export default {
  name: 'MemberOrder',
  components: { OrderItem, OrderCancel, OrderLogistics },
  setup() {
    const activeName = ref('all');

    // 篩選條件
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0,
    });
    const orderList = ref([]);
    const loading = ref(false);
    const total = ref(0);

    const getOrderList = () => {
      loading.value = true;
      findOrderList(reqParams).then(data => {
        orderList.value = data.result.items;
        total.value = data.result.counts;
        loading.value = false;
      });
    };
    // 篩選條件發生變化重新加載
    watch(
      reqParams,
      () => {
        getOrderList();
      },
      { immediate: true }
    );

    // 點擊選項卡
    const tabClick = ({ index }) => {
      reqParams.page = 1;
      reqParams.orderState = index;
    };

    // 刪除訂單
    const handlerDelete = order => {
      Confirm({ text: '您確認要刪除該筆訂單嗎?' })
        .then(() => {
          deleteOrder(order.id).then(() => {
            Message({ type: 'success', text: '成功刪除訂單' });
            getOrderList();
          });
        })
        .catch(() => {});
    };

    return {
      activeName,
      orderStatus,
      orderList,
      tabClick,
      loading,
      total,
      reqParams,
      handlerDelete,
      ...useCancel(),
      ...useConfirm(),
      ...useLogistics(),
    };
  },
};
// 取消訂單邏輯
const useCancel = () => {
  // 元件實例
  const orderCancelCom = ref(null);
  // 點擊取消
  const handlerCancel = order => {
    orderCancelCom.value.open(order);
  };

  return { handlerCancel, orderCancelCom };
};
// 確認收貨邏輯
const useConfirm = () => {
  const handlerConfirm = order => {
    Confirm({ text: '您確認已收貨嗎? 確認後貨款將轉給賣方帳號' })
      .then(() => {
        confirmOrder(order.id).then(() => {
          Message({ type: 'success', text: '已確認收貨' });
          // 待收貨 -> 待評價
          order.orderState = 4;
        });
      })
      .catch(() => {});
  };

  return { handlerConfirm };
};
// 查看物流邏輯
const useLogistics = () => {
  const orderLogisticsCom = ref(null);
  const handlerLogistics = order => {
    orderLogisticsCom.value.open(order);
  };

  return { handlerLogistics, orderLogisticsCom };
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
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif) no-repeat
    center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
