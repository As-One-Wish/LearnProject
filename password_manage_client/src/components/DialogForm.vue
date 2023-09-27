<script setup lang="ts">
import { ref } from 'vue'
import type { InfoItem } from '@/types/common'
import { addInfo, getSingelInfo, updateInfo } from '@/api/infos'
import { ElMessage } from 'element-plus'

/* 按钮文字 */
let buttonText = ref('')
/* 控制弹出框隐藏 */
const dialogVisible = ref(false)
/* 表单整体 */
const infoRef = ref()
/* 弹出框表单数据 */
const formData = ref<InfoItem>({
  id: '',
  name: '',
  isPassword: true,
  content: '',
  account: '',
  comment: ''
})
/* 弹窗打开函数 */
const open = async (type: number, id: string) => {
  if (type === 1) buttonText.value = '添加'
  else if (type === 2) {
    buttonText.value = '更新'
    const { data } = await getSingelInfo(id)
    formData.value = data.result
  }
  dialogVisible.value = true
}
/* 弹出框表单规则 */
const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
}
/* 按钮对应函数 */
const handleButton = async () => {
  await infoRef.value.validate()
  if (buttonText.value === '添加') {
    formData.value.id = new Date().valueOf().toString()
    /* 添加事件 */
    const { data } = await addInfo(formData.value)
    ElMessage({ type: data.code === 1 ? 'success' : 'error', message: data.msg })
    if (data.code === 1) dialogVisible.value = false
    else clearData()
  } else if (buttonText.value === '更新') {
    /* 更新事件 */
    const { data } = await updateInfo(formData.value)
    ElMessage({ type: data.code === 1 ? 'success' : 'error', message: data.msg })
    dialogVisible.value = false
  }
}
/* 弹窗关闭的回调函数 */
const dialogClose = () => {
  clearData()
  emit('close')
}
/* 清空formData数据 */
const clearData = () => {
  formData.value.name = ''
  formData.value.isPassword = true
  formData.value.content = ''
  formData.value.account = ''
  formData.value.comment = ''
}
/* 更新操作时，获取对应数据 */

const emit = defineEmits(['close'])

defineExpose({ open })
</script>

<template>
  <!-- 弹出表单 -->
  <el-dialog :title="buttonText + '信息'" v-model="dialogVisible" width="50%" @close="dialogClose">
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
        <el-button type="primary" @click="handleButton">{{ buttonText }}</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="less">
.el-dialog {
  .el-input {
    width: 70%;
  }
  .el-textarea {
    width: 70%;
  }
}
</style>
