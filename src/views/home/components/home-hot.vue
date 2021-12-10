<template>
  <div class="home-hot">
    <HomePanel title="人氣推薦" sub-title="人氣爆款 不容錯過">
      <!-- 面板內容 -->
      <div ref="target" style="position: relative; height: 426px">
        <Transition name="fade">
          <ul v-if="list.length" class="goods-list">
            <li v-for="item in list" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" alt="" />
                <p class="name">{{ item.title }}</p>
                <p class="desc">{{ item.alt }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel.vue';
import HomeSkeleton from './home-skeleton.vue';
import { findHot } from '@/api/home';
import { useLazyData } from '@/hooks';

export default {
  name: 'HomeHot',
  components: { HomePanel, HomeSkeleton },
  setup() {
    // const list = ref([]);
    // findHot().then(data => {
    //   list.value = data.result;
    // });
    const { result, target } = useLazyData(findHot);
    return { list: result, target };
  },
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    @include hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
