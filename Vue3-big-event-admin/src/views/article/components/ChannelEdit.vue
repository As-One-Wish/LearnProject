<!-- 
 * @description 文章部分通用弹窗组件
 * @fileName ChannelEdit.vue 
 * @author HWJ 
 * @date 2023-08-22 09:14:14
!-->
<script setup>
import { ref } from 'vue'
import { articleAddChannelService, articleEditChannelService } from '@/api/article.js'

const dialogVisible = ref(false)
const form = ref(null)

/**
 *@description 对外暴露方法，基于传来参数，区分添加还是编辑
 *@author HWJ
 *@date 2023-08-22 09:18:07
 */
const open = (row) => {
  formModel.value = { ...row }
  dialogVisible.value = true
}

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '分类名称必须是1-10位的非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的非空字符',
      trigger: 'blur'
    }
  ]
}
const emit = defineEmits(['success'])
/**
 *@description 弹层确认按钮，根据formModel对象中是否有id判断是新增或者修改
 *@author HWJ
 *@date 2023-08-22 10:00:23
 */
const handleConfirm = async () => {
  await form.value.validate()
  if (formModel.value.id) {
    await articleEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await articleAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
defineExpose({
  open
})
</script>
<template>
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑分类' : '添加分类'" width="30%">
    <el-form
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
      ref="form"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input placeholder="请输入分类名称" v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input placeholder="请输入分类别名" v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
