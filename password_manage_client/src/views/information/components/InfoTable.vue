<script setup lang="ts">
import { Search, CirclePlus, Edit, Delete } from '@element-plus/icons-vue'

interface User {
  ind: number
  name: string
  tab: boolean
  content: string
  account: string
  comment: string
}
/* 10 */
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
  },
  {
    ind: 4,
    name: '测试账号',
    tab: false,
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
  },
  {
    ind: 4,
    name: '测试账号',
    tab: false,
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
  },
  {
    ind: 4,
    name: '测试账号',
    tab: false,
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
      show-overflow-tooltip
    >
      <el-table-column prop="ind" label="序号" min-width="10%"> </el-table-column>
      <el-table-column prop="name" label="名称" min-width="30%"> </el-table-column>
      <el-table-column
        prop="tab"
        label="标签"
        min-width="20%"
        :filters="[
          { text: '密码', value: 'true' },
          { text: '普通', value: 'false' }
        ]"
      >
        <template #default="scope">
          <el-tag :type="scope.row.tab ? 'success' : ''">
            {{ scope.row.tab ? '密码' : '一般' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="40%"> </el-table-column>
      <el-table-column prop="account" label="账号" min-width="40%"> </el-table-column>
      <el-table-column prop="comment" label="备注" min-width="50%"> </el-table-column>
      <el-table-column label="操作" min-width="30%">
        <template #default>
          <el-button size="small" type="primary" :icon="Edit"></el-button>
          <el-button size="small" type="danger" :icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="500"
      :hide-on-single-page="true"
      :page-size="16"
    />
  </el-card>
</template>
<style scoped lang="less">
.box-card {
  border-radius: 15px;
  height: 100%;
  background-color: #ffffff;
  position: relative;
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
        font-size: medium;
      }
    }
    .el-button {
      font-size: medium;
      border-radius: 20px;
    }
  }
  .el-pagination {
    position: absolute;
    bottom: 20px;
    right: 30px;
  }
}
</style>
