<script setup lang="ts">
import { Search, DocumentAdd } from '@element-plus/icons-vue'
</script>
<template>
  <el-input placeholder="查找" :prefix-icon="Search"> </el-input>
  <el-button type="primary" :icon="DocumentAdd">添加信息</el-button>
</template>
<style scoped lang="less">
.el-input {
  width: 300px;
  margin-left: 10px;
  :deep(.el-input__wrapper) {
    border-radius: 20px;
  }
  :deep(.el-input__inner) {
    font-family: 'KaiTi';
    font-size: medium;
  }
}

.el-button {
  width: 150px;
  margin-right: 10px;
  border-radius: 20px;
  font-family: 'KaiTi';
  font-size: medium;
}
</style>
