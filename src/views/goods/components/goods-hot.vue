<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" />
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/views/category/components/goods-item.vue';
import { computed, ref } from 'vue';
import { findGoodsHot } from '@/api/product';
import { useRoute } from 'vue-router';
export default {
  name: 'GoodsHot',
  components: { GoodsItem },
  props: {
    // 熱榜類型
    type: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    // 類型資料字典
    const types = { 1: '24小時熱銷榜', 2: '週熱銷榜', 3: '總熱銷榜' };
    const title = computed(() => {
      return types[props.type];
    });

    // 發請求獲取資料
    const route = useRoute();
    const goodsList = ref([]);
    findGoodsHot({ id: route.params.id, type: props.type }).then(data => {
      goodsList.value = data.result;
    });

    return { title, goodsList };
  },
};
</script>

<style lang="scss" scoped>
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background-color: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
