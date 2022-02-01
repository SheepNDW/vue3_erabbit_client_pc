<template>
  <div class="xtx-tabs-panel" v-show="name === activeName">
    <slot />
  </div>
</template>
<script>
import { inject } from 'vue';
export default {
  name: 'XtxTabsPanel',
  // label 選項卡文字 name 選項卡唯一標記 div class="xtx-tabs-panel" 內容
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number],
      default: '',
    },
  },
  setup() {
    const activeName = inject('activeName');
    return { activeName };
  },
};
</script>
