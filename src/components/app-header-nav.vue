<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首頁</RouterLink></li>
    <li
      v-for="item in list"
      :key="item.id"
      @mousemove="show(item)"
      @mouseleave="hide(item)"
    >
      <router-link @click="hide(item)" :to="`/category/${item.id}`">{{
        item.name
      }}</router-link>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link @click="hide(item)" :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'AppHeaderNav',
  setup() {
    const store = useStore();
    // 拿到vuex中的分類列表
    const list = computed(() => {
      return store.state.category.list;
    });

    // 跳轉時不會關閉二級類目, 通過資料來控制
    // 1. vuex每個分類加上open資料
    // 2. vuex提供顯示和隱藏函式, 修改當前open狀態
    // 3. 在元件中使用vuex的函式, 使用事件來綁定, 提供一個類名顯示隱藏的類名
    const show = item => {
      store.commit('category/show', item.id);
    };
    const hide = item => {
      store.commit('category/hide', item.id);
    };

    return { list, show, hide };
  },
};
</script>

<style lang="scss" scoped>
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 999;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
      // 顯示2級類目 (hover控制)
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}

// 2級類目顯示
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: $xtxColor;
        }
      }
    }
  }
}
</style>
