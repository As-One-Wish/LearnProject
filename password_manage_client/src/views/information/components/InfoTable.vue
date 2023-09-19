<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <slot name="title"></slot>
        <el-input placeholder="查找信息" :prefix-icon="Search"></el-input>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>
<style scoped lang="less">
.box-card {
  border-radius: 15px;
  height: 100%;
  background-color: #ffffff;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80%;
    .el-input {
      width: 200px;
      :deep(.el-input__wrapper) {
        border-radius: 20px;
      }
      :deep(.el-input__inner) {
        font-family: 'KaiTi';
        font-size: medium;
      }
    }
  }
}
</style>
