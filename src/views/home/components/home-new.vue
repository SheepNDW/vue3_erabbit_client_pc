<template>
  <div class="home-new">
    <HomePanel title="新鮮好物" sub-title="新鮮出爐 品質保證">
      <template #right><XtxMore path="/" /></template>
      <div ref="target" style="position: relative; height: 426px">
        <!-- 面板內容 -->
        <Transition name="fade">
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton bg="#f0f9f4" v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel.vue';
import HomeSkeleton from './home-skeleton.vue';
import { findNew } from '@/api/home';
import { useLazyData } from '@/hooks';
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup() {
    // const goods = ref([]);
    // findNew().then(data => {
    //   goods.value = data.result;
    // });

    // 1.target去綁定一個監聽對象, 最好是DOM
    // 2.傳入api函式, 返回就是響應式的資料
    const { result, target } = useLazyData(findNew);
    return { goods: result, target };
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
