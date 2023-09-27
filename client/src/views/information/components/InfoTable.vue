<script setup lang="ts">
import { getInfoList, deleteInfo } from '@/api/infos'
import type { InfoItem, PageParams } from '@/types/common'
import { Search, CirclePlus, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()

/* 加载效果控制 */
const isLoading = ref(true)
/* 表单整体 */
const infoRef = ref()
/* 搜索框的值 */
const searchCoutent = ref('')

/* 分页参数 */
const pageParams: PageParams & {
  counts: 0
  pages: 0
} = {
  page: 1,
  pageSize: 10,
  counts: 0,
  pages: 0,
  kind: 0,
  type: false,
  content: ''
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
const copyContent = async (row: object, column: object, cell: string, event: any) => {
  await toClipboard(event.target.innerText)
  ElMessage.success('复制成功')
}
/* 删除信息 */
const onDelInfo = async (name: string) => {
  const { data } = await deleteInfo([name])
  ElMessage({ type: data.code === 1 ? 'success' : 'error', message: data.msg })
  getInfos()
}
/* 筛选框数值变化 */
const onFilterChange = (filters: { [columnKey: string]: string[] }) => {
  pageParams.type = filters[Object.keys(filters)[0]][0] === 'true'
  const fct = Object.values(filters).some((filter) => filter.length > 0)
  pageParams.kind = fct ? (pageParams.content !== '' ? 3 : 1) : pageParams.content !== '' ? 2 : 0
  pageParams.page = 1
  getInfos()
}
/* 搜索函数 */
const onSearch = () => {
  pageParams.kind =
    searchCoutent.value === '' ? (pageParams.kind === 1 ? 3 : 0) : pageParams.kind === 1 ? 3 : 2
  pageParams.content = searchCoutent.value
  getInfos()
}
/* 表单关闭回调函数 */
const onClose = () => {
  getInfos()
}
/* 控制搜索结果高亮 */
const highlightText = (data: string) => {
  if (pageParams.content === '') return data
  const regex = new RegExp(pageParams.content, 'gi')
  return data.replace(regex, '<span style="background-color:#fdfc3e">$&</span>')
}

/* 函数执行区 */
getInfos()
</script>
<template>
  <el-card class="box-card">
    <!-- 头部功能区 -->
    <template #header>
      <div class="card-header">
        <el-input
          placeholder="查找信息"
          :prefix-icon="Search"
          v-model="searchCoutent"
          @change="onSearch"
        ></el-input>
        <el-button type="primary" @click="infoRef.open(1, '')">
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
      @filter-change="onFilterChange"
    >
      <el-table-column type="index" label="序号" min-width="10%" :index="preInd"> </el-table-column>
      <el-table-column prop="name" label="名称" min-width="30%" type="html">
        <template #default="scope">
          <div v-html="highlightText(scope.row.name)"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="isPassword"
        label="标签"
        min-width="20%"
        :filters="[
          { text: '密码', value: 'true' },
          { text: '普通', value: 'false' }
        ]"
        :filter-multiple="false"
      >
        <template #default="scope">
          <el-tag :type="scope.row.isPassword ? 'success' : ''">
            {{ scope.row.isPassword ? '密码' : '普通' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="40%">
        <template #default="scope">
          <div v-html="highlightText(scope.row.content)"></div>
        </template>
      </el-table-column>
      <el-table-column prop="account" label="账号" min-width="40%">
        <template #default="scope">
          <el-tag v-if="!scope.row.isPassword" type="info">暂无数据</el-tag>
          <span v-else v-html="highlightText(scope.row.account)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="备注" min-width="50%">
        <template #default="scope">
          <span v-html="highlightText(scope.row.comment)"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="30%">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            :icon="Edit"
            @click="infoRef.open(2, scope.row.id)"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            @click="onDelInfo(scope.row.id)"
          ></el-button>
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
    <DialogForm ref="infoRef" @close="onClose"></DialogForm>
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
