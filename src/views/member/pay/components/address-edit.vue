<template>
  <XtxDialog title="新增取貨地址" v-model:visible="visibleDialog">
    <!-- 表單 -->
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">取貨人：</div>
          <div class="field">
            <input class="input" placeholder="請輸入取貨人" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手機號碼：</div>
          <div class="field">
            <input class="input" placeholder="請輸入手機號碼" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地區：</div>
          <div class="field">
            <XtxCity placeholder="請選擇所在地區" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">詳細地址：</div>
          <div class="field">
            <input class="input" placeholder="請輸入詳細地址" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">郵遞區號：</div>
          <div class="field">
            <input class="input" placeholder="請輸入郵遞區號" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址標籤：</div>
          <div class="field">
            <input class="input" placeholder="請輸入地址標籤，逗號分隔" />
          </div>
        </div>
      </div>
    </div>
    <!-- 按鈕 -->
    <template #footer>
      <XtxButton type="gray" style="margin-right: 20px">取消</XtxButton>
      <XtxButton type="primary">確認</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'AdressEdit',
  setup() {
    const visibleDialog = ref(false);

    // 定義一個open函式, 當作打開對話框函式(元件實例擁有open函式)
    const open = () => {
      visibleDialog.value = true;
    };

    return { visibleDialog, open };
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
