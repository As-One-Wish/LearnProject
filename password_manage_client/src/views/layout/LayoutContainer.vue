<script setup lang="ts">
import { Lock, Setting } from '@element-plus/icons-vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <el-container class="layout-container">
    <!-- 侧边导航栏 -->
    <el-aside width="70px">
      <div class="_logo"></div>
      <el-menu active-text-color="#5077f4" default-active="/info" text-color="#797879" router>
        <el-menu-item index="/info">
          <el-icon><Lock /></el-icon>
        </el-menu-item>
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧主体 -->
    <el-container>
      <!-- 主体头部 -->
      <el-header>
        <HeaderComponent></HeaderComponent>
      </el-header>
      <!-- 数据显示主体 -->
      <el-main>
        <RouterView></RouterView>
      </el-main>
      <!-- 主体底部 -->
      <el-footer>密码盒子 ©2023 Created by HWJ</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
.layout-container {
  height: 100vh;

  .el-aside {
    border-right: 1px solid #ebeced;
    ._logo {
      height: 45px;
      background: url('@/assets/pkq.jpg') no-repeat center;
      background-size: cover;
    }
    .el-menu {
      margin-top: 10px;
      border-right: none;
      padding-right: 5px;
    }
  }
  .el-header {
    border-left: none;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-main {
    overflow: hidden;
    background-color: #ebeced;
    padding: 1%;
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
