<template>
  <transition name="down">
    <div class="xtx-message" :style="style[type]" v-show="visible">
      <!-- 上面綁定的是樣式 -->
      <!-- 不同提示圖標會變 :class="{'icon-warning':true}" :class="['icon-warning']" -->
      <i class="iconfont" :class="[style[type].icon]"></i>
      <span class="text">{{ text }}</span>
    </div>
  </transition>
</template>
<script>
import { onMounted, ref } from 'vue';
export default {
  name: 'XtxMessage',
  props: {
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      // warn 警告  error 錯誤  success 成功
      default: 'warn',
    },
  },
  setup() {
    // 定義一個物件，包含三種情况的樣式，物件key就是類型字符串
    const style = {
      warn: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)',
      },
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)',
      },
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)',
      },
    };

    // 控制元素顯示隱藏
    const visible = ref(false);
    onMounted(() => {
      visible.value = true;
    });

    return { style, visible };
  },
};
</script>

<style lang="scss" scoped>
.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
// 動畫
.down {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
</style>
