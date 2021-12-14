<template>
  <div class="sub-category">
    <div class="container">
      <!-- 麵包屑 -->
      <SubBread />
      <!-- 篩選區 -->
      <SubFilter />
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue';
import SubFilter from './components/sub-filter.vue';
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter },
};
</script>

<style lang="scss" scoped></style>
