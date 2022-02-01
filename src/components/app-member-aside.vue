<template>
  <div class="xtx-member-aside">
    <div class="user-manage">
      <h4>我的帳戶</h4>
      <div class="links">
        <RouterLink exact-active-class="active" to="/member">個人中心</RouterLink>
        <a href="javascript:;">消息通知</a>
        <a href="javascript:;">個人信息</a>
        <a href="javascript:;">安全設置</a>
        <a href="javascript:;">地址管理</a>
        <a href="javascript:;">我的積分</a>
        <a href="javascript:;">我的足跡</a>
        <a href="javascript:;">邀請有禮</a>
        <a href="javascript:;">幸運抽獎</a>
      </div>
      <h4>交易管理</h4>
      <div class="links">
        <RouterLink active-class="active" to="/member/order">我的訂單</RouterLink>
        <a href="javascript:;">優惠券</a>
        <a href="javascript:;">禮品卡</a>
        <a href="javascript:;">評價晒單</a>
        <a href="javascript:;">售後服務</a>
      </div>
      <h4>我的收藏</h4>
      <div class="links">
        <a href="javascript:;">收藏的商品</a>
        <a href="javascript:;">收藏的專題</a>
        <a href="javascript:;">關注的品牌</a>
      </div>
      <h4>幫助中心</h4>
      <div class="links">
        <a href="javascript:;">幫助中心</a>
        <a href="javascript:;">線上客服</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XtxMemberAside',
};
</script>

<style lang="scss" scoped>
.xtx-member-aside {
  width: 220px;
  margin-right: 20px;
  border-radius: 2px;
  .user-manage {
    background-color: #fff;
    h4 {
      font-size: 18px;
      font-weight: 400;
      padding: 20px 52px 5px;
      border-top: 1px solid #f6f6f6;
    }

    .links {
      padding: 0 52px 10px;
    }

    a {
      display: block;
      line-height: 1;
      padding: 15px 0;
      font-size: 14px;
      color: #666;
      position: relative;

      &:hover {
        color: $xtxColor;
      }
      &.active {
        color: $xtxColor;

        &:before {
          display: block;
        }
      }

      &:before {
        content: '';
        display: none;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        top: 19px;
        left: -16px;
        background-color: $xtxColor;
      }
    }
  }
}
</style>
