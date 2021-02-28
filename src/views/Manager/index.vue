<template>
  <div>
    <h2>管理页面</h2>
    <managerMenu></managerMenu>
    <router-view></router-view>
  </div>
</template>

<script>
import managerMenu from "./managerMenu";

export default {
  components: {
    managerMenu
  }
};
</script>
