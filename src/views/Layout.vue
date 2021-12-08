<template>
  <!-- 頂部通欄 -->
  <AppNavBar />
  <!-- 頭部元件 -->
  <AppHeader />
  <!-- 吸頂頭部元件 -->
  <AppHeaderSticky />
  <!-- 內容容器 -->
  <div class="app-body">
    <!-- 二級路由 -->
    <router-view></router-view>
  </div>
  <!-- 底部元件 -->
  <AppFooter />
</template>

<script>
import AppNavBar from '@/components/app-navbar.vue';
import AppHeader from '@/components/app-header.vue';
import AppFooter from '@/components/app-footer.vue';
import AppHeaderSticky from '@/components/app-header-sticky.vue';
import { useStore } from 'vuex';
export default {
  name: 'Layout',
  components: { AppNavBar, AppHeader, AppFooter, AppHeaderSticky },
  // 獲取分類資料
  setup() {
    const store = useStore();
    store.dispatch('category/getList');
  },
};
</script>

<style lang="scss" scoped>
.app-body {
  min-height: 600px;
}
</style>
