<script setup lang="ts"></script>
<template>
  <el-container class="layout-container">
    <el-header>
      <el-row>
        <el-col :span="8">你好</el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8">你好</el-col>
      </el-row>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</template>
<style scoped lang="less">
.layout-container {
  border-radius: 15px;
  height: 100%;
  background-color: #ffffff;
  .el-header {
    height: 20%;
    .el-row {
      background-color: aqua;
      align-items: center;
      justify-content: space-between;
    }
  }
  .el-main {
    height: 80%;
  }
}
</style>
