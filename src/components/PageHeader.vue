<template>
  <div>
    <el-row>
      <el-col :span="20" class="header-nav-left">
        <img alt="Vue logo" src="@/assets/logo.png" class="logo" />
        <el-menu
          :router="true"
          mode="horizontal"
          background-color="#20232a"
          text-color="#fff"
          active-text-color="#1890FF"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/post">发表文章</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-menu
          :router="true"
          mode="horizontal"
          background-color="#20232a"
          text-color="#fff"
          active-text-color="#1890FF"
          style="display: flex; justify-content: flex-end;"
        >
          <template v-if="!hasPermission">
            <el-menu-item index="/login">登录</el-menu-item>
            <el-menu-item index="/reg">注册</el-menu-item>
          </template>
          <el-submenu v-else index="profile">
            <template slot="title">{{ userInfo.name }}</template>
            <el-menu-item @click="handleLogout">
              退出登录
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("user");

export default {
  name: "Header",
  computed: {
    ...mapState(["userInfo", "hasPermission"])
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 50px;
  margin-top: 5px;
}
.header-nav-left {
  display: flex;
}
</style>
