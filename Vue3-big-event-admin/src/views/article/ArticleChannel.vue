<!-- 
 * @description 频道管理
 * @fileName ArticleChannel.vue 
 * @author HWJ 
 * @date 2023-08-21 11:29:48
!-->
<script setup>
import { ref } from 'vue'
import { articleGetChannelsService, articleDelChannelService } from '@/api/article.js'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'

defineOptions({})

const channelList = ref([])
const loadingStatus = ref(false)
const getChannelList = async () => {
  loadingStatus.value = true
  const res = await articleGetChannelsService()
  channelList.value = res.data.data
  loadingStatus.value = false
}
getChannelList()

const dialog = ref(null)

/**
 *@description 编辑行
 *@author HWJ
 *@date 2023-08-22 09:24:21
 */
const onEditChannel = (row) => {
  dialog.value.open(row)
}
/**
 *@description 添加行
 *@author HWJ
 *@date 2023-08-22 09:24:30
 */
const onAddChannel = () => {
  dialog.value.open({})
}
/**
 *@description 删除行
 *@author HWJ
 *@date 2023-08-22 09:24:36
 */
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('确定要删除分类 ' + row.cate_name + ' 吗?', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await articleDelChannelService(row)
  getChannelList()
}
/**
 *@description 子组件操作成功执行
 *@author HWJ
 *@date 2023-08-22 10:18:25
 */
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loadingStatus">
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button
            @click="onEditChannel(row)"
            :icon="Edit"
            type="primary"
            plain
            circle
          ></el-button>
          <el-button
            @click="onDelChannel(row)"
            :icon="Delete"
            type="danger"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据呀" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </PageContainer>
</template>

<style scoped></style>
