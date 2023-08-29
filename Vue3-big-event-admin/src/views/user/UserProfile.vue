<!-- 
 * @description 个人详情
 * @fileName UserProfile.vue 
 * @author HWJ 
 * @date 2023-08-21 11:37:08
!-->
<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { userGetInfoService, userUpdateInfoService } from '@/api/user.js'
import { computed, ref, watch } from 'vue'
import { objCom } from '@/utils/format.js'

const formRef = ref()
const isLoading = ref(false)
const isEdit = ref(false)

const userInfo = ref({
  username: '',
  nickname: '',
  email: ''
})
let changeInfo = computed(() => {
  return JSON.stringify(userInfo.value)
})
const getUserInfo = async () => {
  isLoading.value = true
  const res = await userGetInfoService()
  userInfo.value = res.data.data
  userInfo.value.user_pic = ''
  isLoading.value = false
}
getUserInfo()

watch(
  changeInfo,
  (newValue, oldValue) => {
    const oldInfo = JSON.parse(oldValue)
    const newInfo = JSON.parse(newValue)

    if (objCom(oldInfo, newInfo)) isEdit.value = true
  },
  { deep: true }
)

const rules = {
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { pattern: /^\S{2,10}$/, message: '昵称必须为2-10位的非空字符串', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: 'blur'
    }
  ]
}
const onUpdateUser = async () => {
  await formRef.value.validate()
  await userUpdateInfoService(userInfo.value)
  ElMessage.success('用户信息修改成功')
  getUserInfo()
  isEdit.value = false
}
</script>

<template>
  <PageContainer title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
          v-loading="isLoading"
        >
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onUpdateUser" :disabled="!isEdit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </PageContainer>
</template>

<style scoped></style>
