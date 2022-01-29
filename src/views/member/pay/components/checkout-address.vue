<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加取貨地址才可提交訂單。</div>
      <ul v-if="showAddress">
        <li>
          <span>取<i />貨<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li>
          <span>聯絡方式：</span
          >{{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') }}
        </li>
        <li>
          <span>取貨地址：</span>{{ showAddress.fullLocation.replace(/ /g, '')
          }}{{ showAddress.address }}
        </li>
      </ul>
      <a @click="openAddressEdit(showAddress)" v-if="showAddress" href="javascript:;"
        >修改地址</a
      >
    </div>
    <div class="action">
      <XtxButton @click="openDialog" class="btn">切換地址</XtxButton>
      <XtxButton @click="openAddressEdit({})" class="btn">新增地址</XtxButton>
    </div>
  </div>
  <!-- 對話框元件-切換取貨地址 -->
  <XtxDialog title="切換取貨地址" v-model:visible="visibleDialog">
    <div
      @click="selectedAddress = item"
      :class="{ active: selectedAddress && selectedAddress.id === item.id }"
      class="text item"
      v-for="item in list"
      :key="item.id"
    >
      <ul>
        <li>
          <span>取<i />貨<i />人：</span>{{ item.receiver }}
        </li>
        <li>
          <span>聯絡方式：</span
          >{{ item.contact.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') }}
        </li>
        <li>
          <span>取貨地址：</span>{{ item.fullLocation.replace(/ /g, '') + item.address }}
        </li>
      </ul>
    </div>
    <template #footer>
      <XtxButton @click="visibleDialog = false" type="gray" style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton @click="confirmAddressFn" type="primary">確認</XtxButton>
    </template>
  </XtxDialog>
  <!-- 取貨地址-新增&編輯元件 -->
  <AddressEdit @on-success="successHandler" ref="addressEditCom" />
</template>
<script>
import { ref } from 'vue';
import AddressEdit from './address-edit.vue';
export default {
  name: 'CheckoutAddress',
  components: { AddressEdit },
  props: {
    // 取貨地址列表
    list: {
      type: Array,
      default: () => [],
    },
  },
  // 1. 在擁有根元素的元件中, 觸發自定義事件, 有沒有加emits選項無所謂
  // 2. 如果元件是渲染的程式碼片段, vue3.0規範需要在emits中聲明你所觸發的自定義事件
  // 3. 提倡: 觸發了自定義事件, 就需要在emits選項聲明, 可讀性高
  emits: ['change'],
  setup(props, { emit }) {
    // 1. 找到默認取貨地址
    // 2. 沒有默認取貨地址, 使用第一條取貨地址
    // 3. 如果沒有資料, 提示添加
    const showAddress = ref(null);
    const defaultAddress = props.list.find(item => item.isDefault === 0);
    if (defaultAddress) {
      showAddress.value = defaultAddress;
    } else {
      if (props.list.length) {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0];
      }
    }

    // 默認通知父元件一個取貨地址ID
    emit('change', showAddress.value && showAddress.value.id);

    // 切換地址對話框顯示隱藏
    const visibleDialog = ref(false);

    // 紀錄當前已選中的地址ID
    const selectedAddress = ref(null);
    const confirmAddressFn = () => {
      // 顯示的地址換成選中的地址
      showAddress.value = selectedAddress.value;
      // 把選中的地址id通知給結算元件
      emit('change', selectedAddress.value?.id);
      visibleDialog.value = false;
    };
    const openDialog = () => {
      // 將之前選中的資料清空
      selectedAddress.value = null;
      visibleDialog.value = true;
    };

    // 打開新增&編輯取貨地址元件
    const addressEditCom = ref(null);
    const openAddressEdit = address => {
      // 新增: {} 修改: {資料}
      addressEditCom.value.open(address);
    };

    const successHandler = formData => {
      // 根據formData中的id去當前地址列表中查找, 有就是修改, 否則是新增
      const address = props.list.find(item => item.id === formData.id);
      if (address) {
        for (const key in address) {
          address[key] = formData[key];
        }
      } else {
        // 如果是新增: 往list中追加一條
        // 當你在修改formData的時候, 陣列中的資料也會更新, 因為是同一個引用地址
        // 啥時修改formData, 當打開對話框時會清空之前輸入的資訊
        // 要深拷貝formData資料
        const jsonStr = JSON.stringify(formData);
        // eslint-disable-next-line vue/no-mutating-props
        props.list.unshift(JSON.parse(jsonStr));
      }
    };

    return {
      showAddress,
      visibleDialog,
      selectedAddress,
      confirmAddressFn,
      openDialog,
      openAddressEdit,
      addressEditCom,
      successHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
.xtx-dialog {
  // 產生滾動條
  :deep(.wrapper) {
    .body {
      max-height: 600px;
      overflow-y: auto;
    }
  }
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: $xtxColor;
        background: lighten($xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}

.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
