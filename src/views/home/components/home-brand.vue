<template>
  <HomePanel title="熱門品牌" sub-title="國際經典 品質保證">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
        :class="{ disabled: index === 0 }"
      ></a>
      <a
        @click="toggle(1)"
        href="javascript:;"
        class="iconfont icon-angle-right next"
        :class="{ disabled: index === 1 }"
      ></a>
    </template>
    <div class="box" ref="target">
      <Transition name="fade">
        <ul
          v-if="brands.length"
          class="list"
          :style="{ transform: `translateX(${-index * 1240}px)` }"
        >
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { ref } from 'vue';
import HomePanel from './home-panel';
import { findBrand } from '@/api/home';
import { useLazyData } from '@/hooks';
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup() {
    // 獲取資料
    // const brands = ref([]);
    // findBrand(10).then(data => {
    //   brands.value = data.result;
    // });
    // 注意: useLazyData需要的是API函式, 如果遇到需要傳參的情況, 寫個函式再裡面去掉用API即可
    const { target, result } = useLazyData(() => findBrand(10));

    // 切換效果, 前提只有 0 1 兩頁
    const index = ref(0);
    // 1.點擊prev
    // 2.點擊next
    const toggle = step => {
      const newIndex = index.value + step;
      if (newIndex < 0 || newIndex > 1) return;
      index.value = newIndex;
    };

    return { brands: result, toggle, index, target };
  },
};
</script>

<style lang="scss" scoped>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: $xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
