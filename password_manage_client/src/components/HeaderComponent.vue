<script setup lang="ts">
import { Download, Tools } from '@element-plus/icons-vue'
</script>
<template>
  <span class="label_app">密码盒子</span>
  <el-dropdown placement="bottom-end">
    <span class="dropdown__box">
      <el-icon size="28"><Tools /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu class="dropdown-menu">
        <el-dropdown-item command="profile">
          <el-icon size="18"><Download /></el-icon>
          <span style="font-size: large">数据下载</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style scoped lang="less">
.label_app {
  letter-spacing: 3px;
  font-size: xx-large;
}
.dropdown__box {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dropdown-menu {
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-button {
  width: 150px;
  margin-right: 10px;
  border-radius: 20px;
  font-size: medium;
}
</style>
