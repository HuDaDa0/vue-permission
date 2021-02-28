<template>
  <div>
    article post
    <el-button v-has="'edit'">编辑</el-button>
    <el-button v-has="'delete'">删除</el-button>
  </div>
</template>

<script>
export default {
  name: "Article"
};
</script>

<style lang="scss" scoped></style>
