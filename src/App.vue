<template>
  <div id="app">
    <el-container>
      <el-header>
        <PageHeader></PageHeader>
      </el-header>

      <el-main>
        <router-view />
      </el-main>

      <el-footer>
        <PageFooter></PageFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";

export default {
  name: "App",
  components: {
    PageHeader,
    PageFooter
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
.el-header,
.el-footer {
  color: #fff;
  background-color: #20232a;
}
.el-main {
  min-height: calc(100vh - 120px);
}
</style>
