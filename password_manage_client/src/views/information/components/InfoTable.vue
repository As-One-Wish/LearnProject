<script setup lang="ts">
import { Search, CirclePlus } from '@element-plus/icons-vue'

interface User {
  ind: number
  name: string
  tab: boolean
  content: string
  account: string
  comment: string
}

const tableData: User[] = [
  {
    ind: 1,
    name: '测试账号',
    tab: true,
    content: '测试账号内容',
    account: '这是账号',
    comment: '这是备注'
  },
  {
    ind: 2,
    name: '测试账号',
    tab: false,
    content: '测试账号内容',
    account: '这是账号',
    comment: '这是备注'
  },
  {
    ind: 3,
    name: '测试账号',
    tab: true,
    content: '测试账号内容',
    account: '这是账号',
    comment: '这是备注'
  },
  {
    ind: 4,
    name: '测试账号',
    tab: false,
    content: '测试账号内容',
    account: '这是账号',
    comment: '这是备注'
  }
]
</script>
<template>
  <el-card class="box-card">
    <!-- 头部功能区 -->
    <template #header>
      <div class="card-header">
        <el-input placeholder="查找信息" :prefix-icon="Search"></el-input>
        <el-button type="primary">
          <el-icon size="20"><CirclePlus /></el-icon>
          <span>信息添加</span>
        </el-button>
      </div>
    </template>
    <!-- 表单部分 -->
    <el-table
      style="width: 100%"
      :data="tableData"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="ind" label="序号" width="100"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="tab" label="标签" width="150">
        <template #default="scope">
          <el-tag :type="scope.row.tab ? 'success' : ''">
            {{ scope.row.tab ? '密码' : '一般' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" width="300"> </el-table-column>
      <el-table-column prop="account" label="账号" width="250"> </el-table-column>
      <el-table-column prop="comment" label="备注" width="250"> </el-table-column>
      <el-table-column label="操作">
        <template #default>
          <el-button size="small">Edit</el-button>
          <el-button size="small" type="danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    .el-button {
      font-family: 'KaiTi';
      font-size: medium;
      border-radius: 20px;
    }
  }
}
</style>
