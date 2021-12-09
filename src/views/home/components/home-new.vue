<template>
  <div class="home-new">
    <HomePanel title="新鮮好物" sub-title="新鮮出爐 品質保證">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板內容 -->
      <ul class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script>
import { ref } from 'vue';
import HomePanel from './home-panel.vue';
import { findNew } from '@/api/home';
export default {
  name: 'HomeNew',
  components: { HomePanel },
  setup() {
    const goods = ref([]);
    findNew().then(data => {
      goods.value = data.result;
    });
    return { goods };
  },
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    @include hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: $priceColor;
    }
  }
}
</style>
