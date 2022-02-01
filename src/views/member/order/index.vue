<template>
  <div class="member-order">
    <!-- tab元件 -->
    <XtxTabs v-model="activeName">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        >{{ item.label }}</XtxTabsPanel
      >
    </XtxTabs>
  </div>
</template>

<script>
import { ref } from 'vue';
import { orderStatus } from '@/api/constants.js';
export default {
  name: 'MemberOrder',
  setup() {
    const activeName = ref('all');

    return { activeName, orderStatus };
  },
};
</script>

<style lang="scss" scoped></style>
