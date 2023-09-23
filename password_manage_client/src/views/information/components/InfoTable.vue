<script setup lang="ts">
import { addInfo, getInfoList } from '@/api/infos'
import { InfoItem, PageParams } from '@/types/common'
import { Search, CirclePlus, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()

/* 控制弹出框隐藏 */
const dialogVisible = ref(false)
/* 加载效果控制 */
const isLoading = ref(true)
/* 表单整体 */
const infoRef = ref()
/* 弹出框表单数据 */
const formData = ref({
  name: '',
  isPassword: true,
  content: '',
  account: '',
  comment: ''
})
/* 弹出框表单规则 */
const rules = {
  name: [],
  content: []
}
/* 信息添加函数 */
const onAddInfo = async () => {
  const info: InfoItem = {
    id: '',
    ...formData.value
  }
  const { data } = await addInfo(info)
  ElMessage({ type: data.code === 1 ? 'success' : 'error', message: data.msg })
  if (data.code === 1) dialogVisible.value = false
  else clearData()
}
/* 弹窗关闭的回调函数 */
const dialogClose = () => {
  clearData()
  getInfos()
}
/* 清空formData数据 */
const clearData = () => {
  formData.value.name = ''
  formData.value.isPassword = true
  formData.value.content = ''
  formData.value.account = ''
  formData.value.comment = ''
}
/* 分页参数 */
const pageParams: PageParams & {
  counts: 0
  pages: 0
} = {
  page: 1,
  pageSize: 10,
  counts: 0,
  pages: 0
}
/* 获取信息列表 */
const infoList = ref<InfoItem[]>()
const getInfos = async () => {
  isLoading.value = true
  const { data } = await getInfoList(pageParams)
  infoList.value = data.result.infos
  pageParams.counts = data.result.counts
  pageParams.pages = data.result.pages
  isLoading.value = false
}
/* 计算每页序号 */
const preInd = (index: number) => {
  return index + (pageParams.page - 1) * pageParams.pageSize + 1
}
/* 页面切换执行函数 */
const handleCurrentPageChange = () => {
  getInfos()
}
/* 单元格双击复制 */
const copyContent = async (row, column, cell, event) => {
  await toClipboard(event.target.innerText)
  ElMessage.success('复制成功')
}

/* 函数执行区 */
getInfos()
</script>
<template>
  <el-card class="box-card">
    <!-- 头部功能区 -->
    <template #header>
      <div class="card-header">
        <el-input placeholder="查找信息" :prefix-icon="Search"></el-input>
        <el-button type="primary" @click="dialogVisible = true">
          <el-icon size="20"><CirclePlus /></el-icon>
          <span>信息添加</span>
        </el-button>
      </div>
    </template>
    <!-- 表单部分 -->
    <el-table
      style="width: 100%"
      :data="infoList"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      show-overflow-tooltip
      v-loading="isLoading"
      @cell-dblclick="copyContent"
    >
      <el-table-column type="index" label="序号" min-width="10%" :index="preInd"> </el-table-column>
      <el-table-column prop="name" label="名称" min-width="30%"> </el-table-column>
      <el-table-column
        prop="isPassword"
        label="标签"
        min-width="20%"
        :filters="[
          { text: '密码', value: 'true' },
          { text: '普通', value: 'false' }
        ]"
      >
        <template #default="scope">
          <el-tag :type="scope.row.isPassword ? 'success' : ''">
            {{ scope.row.isPassword ? '密码' : '一般' }}
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
      :total="pageParams.counts"
      :hide-on-single-page="true"
      v-model:page-size="pageParams.pageSize"
      v-model:current-page="pageParams.page"
      @update:current-page="handleCurrentPageChange"
    />
    <!-- 弹出表单 -->
    <el-dialog title="添加信息" v-model="dialogVisible" width="30%" @close="dialogClose">
      <el-form label-width="20%" :model="formData" :rules="rules" ref="infoRef">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="formData.isPassword">
            <el-radio :label="true" default>密码</el-radio>
            <el-radio :label="false">普通</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="formData.content" />
        </el-form-item>
        <el-form-item label="账号" v-if="formData.isPassword">
          <el-input v-model="formData.account" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formData.comment" />
        </el-form-item>
        <el-form-item style="padding-left: 10%">
          <el-button type="primary" @click="onAddInfo">添加</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  .el-dialog {
    .el-input {
      width: 70%;
    }
    .el-textarea {
      width: 70%;
    }
  }
}
</style>
