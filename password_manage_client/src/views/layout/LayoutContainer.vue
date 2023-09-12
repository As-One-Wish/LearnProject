<script setup lang="ts"></script>

<template>
  <el-container class="layout-container">
    <!-- 侧边导航栏 -->
    <el-aside width="200px">
      <div class="el-aside _logo">这里是Logo</div>
      <el-menu --active-color="#eff5ff" default-active="2" text-color="#606266" router>
        <el-menu-item>
          <el-icon></el-icon>
          <span>密码</span>
        </el-menu-item>
        <el-menu-item>一般</el-menu-item>
        <el-menu-item>设置</el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧主体 -->
    <el-container>
      <!-- 主体头部 -->
      <el-header>Header</el-header>
      <!-- 数据显示主体 -->
      <el-main>Main</el-main>
      <!-- 主体底部 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
.layout-container {
  height: 100vh;
}
.el-aside {
  ._log {
    height: 120px;
    // background: url('@/assets/logo.png') no-repeat center / 120px auto;
  }
}
</style>
