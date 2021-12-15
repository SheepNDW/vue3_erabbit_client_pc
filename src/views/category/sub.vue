<template>
  <div class="sub-category">
    <div class="container">
      <!-- 麵包屑 -->
      <SubBread />
      <!-- 篩選區 -->
      <SubFilter />
      <!-- 測試複選框 -->
      <XtxCheckbox v-model="isAllChecked">全選</XtxCheckbox>{{ isAllChecked }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import SubBread from './components/sub-bread.vue';
import SubFilter from './components/sub-filter.vue';
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter },
  setup() {
    const isAllChecked = ref(true);
    return { isAllChecked };
  },
};
</script>

<style lang="scss" scoped></style>
