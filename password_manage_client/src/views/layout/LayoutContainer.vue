<script setup lang="ts">
import { Lock, Document, Setting } from '@element-plus/icons-vue'
</script>

<template>
  <el-container class="layout-container">
    <!-- 侧边导航栏 -->
    <el-aside width="200px">
      <div class="el-aside _logo">这里是Logo</div>
      <el-menu active-text-color="#7ab0fc" default-active="2">
        <el-menu-item index="1">
          <el-icon><Lock /></el-icon>
          <span>密码</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Document /></el-icon>
          <span>一般</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Setting /></el-icon>
          <span>设置</span>
        </el-menu-item>
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
  .el-menu {
    border-right: none;
    .el-menu-item {
      font-size: large;
    }
  }
}
</style>
