<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-user"></i>{{ profile.account }}
            </a>
          </li>
          <li><a href="javascript:;">退出登入</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">請先登入</a></li>
          <li><a href="javascript:;">免費註冊</a></li>
        </template>
        <li><a href="javascript:;">我的訂單</a></li>
        <li><a href="javascript:;">會員中心</a></li>
        <li><a href="javascript:;">幫助中心</a></li>
        <li><a href="javascript:;">關於我們</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手機版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'AppTopnav',
  setup() {
    // 獲取用戶的登入訊息才能控制切換導覽菜單
    const store = useStore();
    // 使用vuex中的state 需要設置計算屬性
    const profile = computed(() => {
      return store.state.user.profile;
    });
    return { profile };
  },
};
</script>

<style lang="scss" scoped>
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: $xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
