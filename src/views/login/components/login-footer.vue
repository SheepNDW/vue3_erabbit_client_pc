<template>
  <footer class="login-footer">
    <div class="container">
      <p>
        <a href="javascript:;">關於我們</a>
        <a href="javascript:;">幫助中心</a>
        <a href="javascript:;">售後服務</a>
        <a href="javascript:;">配送與驗收</a>
        <a href="javascript:;">商業合作</a>
        <a href="javascript:;">搜索推薦</a>
        <a href="javascript:;">友情連結</a>
      </p>
      <p>CopyRight &copy; 小兔鲜儿</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LoginFooter',
};
</script>

<style lang="scss" scoped>
.login-footer {
  padding: 30px 0 50px;
  background: #fff;
  p {
    text-align: center;
    color: #999;
    padding-top: 20px;
    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;
      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>
