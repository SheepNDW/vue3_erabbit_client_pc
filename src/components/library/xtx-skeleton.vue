<template>
  <div
    class="xtx-skeleton"
    :style="{ width, height }"
    :class="{ shan: animated }"
  >
    <!-- 1 盒子-->
    <div class="block" :style="{ backgroundColor: bg }"></div>
    <!-- 2 閃效果 xtx-skeleton 偽元素 --->
  </div>
</template>
<script>
export default {
  name: 'XtxSkeleton',
  // 使用的時候需要動態設置 高度，寬度，背景顏色，是否閃爍
  props: {
    bg: {
      type: String,
      default: '#efefef',
    },
    width: {
      type: String,
      default: '100px',
    },
    height: {
      type: String,
      default: '100px',
    },
    animated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: '';
    position: absolute;
    animation: flash 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes flash {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
