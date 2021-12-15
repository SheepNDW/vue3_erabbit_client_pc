<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core';
// v-model ===> :modelValue + @update:modelValue
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  // 使用useVModel實現雙向資料綁定
  // 1. 使用props接收modelValue
  // 2. 使用useVModel來包裝props中的modelValue屬性資料
  // 3. 在使用checked.value就是使用父元件資料
  // 4. 在使用checked.value = '資料' 賦值, 觸發emit('update:modelValue', '資料')
  setup(props, { emit }) {
    const checked = useVModel(props, 'modelValue', emit);
    const changeChecked = () => {
      const newVal = !checked.value;
      // 通知父元件
      checked.value = newVal;
      // 讓元件支持change事件
      emit('change', newVal);
    };
    return { checked, changeChecked };
  },
};
</script>

<style lang="scss" scoped>
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: $xtxColor;
    ~ span {
      color: $xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
