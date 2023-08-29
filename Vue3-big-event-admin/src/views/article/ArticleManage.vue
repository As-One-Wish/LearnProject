<!-- 
 * @description 文章管理
 * @fileName ArticleManage.vue 
 * @author HWJ 
 * @date 2023-08-21 11:30:20
!-->
<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { articleDelArticlesService, articleGetArticlesService } from '@/api/article.js'
import { ref } from 'vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { formatTime } from '@/utils/format.js'

const articleList = ref([])
const articleTotal = ref(0)
const isLoading = ref(false)

const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
/**
 *@description 获取文章列表
 *@author HWJ
 *@date 2023-08-22 11:02:12
 */
const getArticleList = async () => {
  isLoading.value = true
  const res = await articleGetArticlesService(params.value)
  articleList.value = res.data.data
  articleTotal.value = res.data.total
  isLoading.value = false
}
getArticleList()

/**
 *@description 处理分页逻辑
 *@author HWJ
 *@date 2023-08-22 14:46:14
 */
const handleSizeChange = () => {
  params.value.pagenum = 1
  getArticleList()
}
const handleCurrentChange = () => {
  getArticleList()
}
/**
 *@description 搜索重置事件
 *@author HWJ
 *@date 2023-08-22 14:57:29
 */
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  getArticleList()
}
const onSelected = () => {
  params.value.pagenum = 1
  getArticleList()
}

const drawerRef = ref(null)
/**
 *@description 文章新增事件
 *@author HWJ
 *@date 2023-08-22 15:12:41
 */
const onAddArticle = () => {
  drawerRef.value.open({})
}
/**
 *@description 文章编辑事件
 *@author HWJ
 *@date 2023-08-22 10:55:34
 */
const onEditArticle = (row) => {
  drawerRef.value.open(row)
}
/**
 *@description 文章删除事件
 *@author HWJ
 *@date 2023-08-22 10:55:58
 */
const onDelArticle = async (row) => {
  await ElMessageBox.confirm('确定要删除吗?', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await articleDelArticlesService(row)
}

/**
 *@description 添加或者编辑成功的回调
 *@author HWJ
 *@date 2023-08-23 09:52:39
 */
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((articleTotal.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类:">
        <ChannelSelect v-model:model-value="params.cate_id" @change="onSelected"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state" @change="onSelected">
          <el-option lable="已发布" value="已发布"></el-option>
          <el-option lable="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="isLoading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }"> {{ formatTime(row.pub_state) }} </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            :icon="Edit"
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            :icon="Delete"
            type="danger"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="articleTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 抽屉 -->
    <ArticleEdit ref="drawerRef" @success="onSuccess"></ArticleEdit>
  </PageContainer>
</template>

<style scoped></style>
