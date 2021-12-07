<template>
  <div class="container">
    App <button @click="fn">測試request工具函數</button>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "App",
  setup() {
    const fn = () => {
      request("/member/profile", "get", { a: 10 });
    };
    return { fn };
  },
};
</script>
