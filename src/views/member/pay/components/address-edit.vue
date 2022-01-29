<template>
  <XtxDialog
    :title="`${formData.id ? '修改' : '新增'}取貨地址`"
    v-model:visible="visibleDialog"
  >
    <!-- 表單 -->
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">取貨人：</div>
          <div class="field">
            <input v-model="formData.receiver" class="input" placeholder="請輸入取貨人" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手機號碼：</div>
          <div class="field">
            <input
              v-model="formData.contact"
              class="input"
              placeholder="請輸入手機號碼"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地區：</div>
          <div class="field">
            <XtxCity
              :fullLocation="formData.fullLocation"
              @change="changeCity"
              placeholder="請選擇所在地區"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">詳細地址：</div>
          <div class="field">
            <input
              v-model="formData.address"
              class="input"
              placeholder="請輸入詳細地址"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">郵遞區號：</div>
          <div class="field">
            <input
              v-model="formData.postalCode"
              class="input"
              placeholder="請輸入郵遞區號"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址標籤：</div>
          <div class="field">
            <input
              v-model="formData.addressTags"
              class="input"
              placeholder="請輸入地址標籤，逗號分隔"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 按鈕 -->
    <template #footer>
      <XtxButton @click="visibleDialog = false" type="gray" style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton @click="submit" type="primary">確認</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { reactive, ref } from 'vue';
import { addAddress, editAddress } from '@/api/order';
import Message from '@/components/library/Message';
export default {
  name: 'AdressEdit',
  setup(props, { emit }) {
    const visibleDialog = ref(false);

    // 定義一個open函式, 當作打開對話框函式(元件實例擁有open函式)
    const open = address => {
      visibleDialog.value = true;

      if (address.id) {
        // 如果是修改: 填充表單
        for (const key in address) {
          formData[key] = address[key];
        }
      } else {
        // 如果是新增: 清空表單
        for (const key in formData) {
          if (key === 'isDefault') {
            formData[key] = 1;
          } else {
            formData[key] = null;
          }
        }
      }
    };

    // 定義表單資料
    const formData = reactive({
      receiver: null,
      contact: null,
      provinceCode: null,
      cityCode: null,
      countyCode: null,
      address: null,
      postalCode: null,
      addressTags: null,
      isDefault: 1,
      // 城市元件顯示的文字(完整的行政區地址)
      fullLocation: null,
    });

    // 城市選中
    const changeCity = result => {
      formData.provinceCode = result.provinceCode;
      formData.cityCode = result.cityCode;
      formData.countyCode = result.countyCode;
      formData.fullLocation = result.fullLocation;
    };

    // 新增地址時的提交操作(修改)
    const submit = () => {
      // 1. 省略校驗
      // 2. 發送請求
      if (formData.id) {
        // 修改請求
        editAddress(formData).then(() => {
          Message({ type: 'success', text: '修改取貨地址成功' });
          visibleDialog.value = false;
          // 觸發自定義事件
          emit('on-success', formData);
        });
      } else {
        // 新增請求
        addAddress(formData).then(data => {
          // 需要設置id
          formData.id = data.result.id;
          Message({ type: 'success', text: '新增取貨地址成功' });
          visibleDialog.value = false;
          // 觸發自定義事件
          emit('on-success', formData);
        });
      }
    };

    return { visibleDialog, open, formData, changeCity, submit };
  },
};
</script>

<style lang="scss" scoped>
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>
