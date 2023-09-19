<script setup lang="ts">
import { Download } from '@element-plus/icons-vue'
</script>
<template>
  <span class="label_app">密码盒子</span>
  <el-button type="primary" :icon="Download">数据下载</el-button>
</template>
<style scoped lang="less">
.label_app {
  letter-spacing: 3px;
  font-size: xx-large;
}
.el-button {
  width: 150px;
  margin-right: 10px;
  border-radius: 20px;
  font-family: 'KaiTi';
  font-size: medium;
}
</style>
