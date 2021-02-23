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
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/reg">注册</el-menu-item>
          <el-submenu v-if="false">
            <template slot="title">用户名</template>
            <el-menu-item index="/logout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Header"
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
