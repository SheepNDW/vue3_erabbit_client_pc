<template>
  <div class="xtx-numbox">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="numbox">
      <a @click="changeNum(-1)" href="javascript:;">-</a>
      <input type="text" readonly :value="modelValue" />
      <a @click="changeNum(1)" href="javascript:;">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core';
export default {
  name: 'XtxNumbox',
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Number,
      default: 1,
    },
    // 最小值, 最大值
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    // 1. 綁定按鈕點擊事件 -按鈕 +按鈕 觸發同一個事件, 同一個函數
    // 2. 使用vueuse的useVModel做資料綁定, 修改 count 通知父元件更新
    const count = useVModel(props, 'modelValue', emit);
    const changeNum = step => {
      // 3. 得到將要改變的值, 如果值不合法終止程序
      const newValue = count.value + step;
      if (newValue < props.min || newValue > props.max) return;
      // 4. 正常改值即可
      count.value = newValue;
      // 5. 提供change事件
      emit('change', newValue);
    };
    return { changeNum };
  },
};
</script>

<style lang="scss" scoped>
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
