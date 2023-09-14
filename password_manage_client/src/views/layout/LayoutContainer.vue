<script setup lang="ts">
import { Lock, Document, Setting, Search } from '@element-plus/icons-vue'
</script>

<template>
  <el-container class="layout-container">
    <!-- 侧边导航栏 -->
    <el-aside width="200px">
      <div class="_logo"></div>
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
      <el-header>
        <el-input placeholder="查找" class="search-box" :prefix-icon="Search"> </el-input>
        <el-button type="primary" class="add-button"></el-button>
      </el-header>
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
  ._logo {
    height: 10vh;
    background: url('@/assets/Logo.png') no-repeat center / 120px auto;
    background-size: cover;
  }
  .el-menu {
    border-right: none;
    .el-menu-item {
      font-size: large;
    }
  }
}
.el-header {
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search-box {
    width: 20vw;
    margin-left: 10px;
  }
  .add-button {
    margin-right: 10px;
  }
}
</style>
