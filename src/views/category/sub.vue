<template>
  <div class="sub-category">
    <div class="container">
      <!-- 麵包屑 -->
      <SubBread />
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue';
export default {
  name: 'SubCategory',
  components: { SubBread },
};
</script>

<style lang="scss" scoped></style>
