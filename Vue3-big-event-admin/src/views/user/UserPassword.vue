<!-- 
 * @description 重置密码
 * @fileName UserPassword.vue 
 * @author HWJ 
 * @date 2023-08-21 11:36:16
!-->
<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { userUpdatePasswordervice } from '@/api/user.js'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index.js'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref()
const formData = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { pattern: /^\S{6,15}/, message: '密码必须是6-15位的非空字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { pattern: /^\S{6,15}/, message: '密码必须是6-15位的非空字符', trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { pattern: /^\S{6,15}/, message: '密码必须是6-15位的非空字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.new_pwd) callback(new Error('两次密码输入不一致'))
        callback()
      },
      trigger: 'blur'
    }
  ]
}

const onChangePwd = async () => {
  await formRef.value.validate()
  await userUpdatePasswordervice(formData.value)
  ElMessage.success('密码修改成功')
  formRef.value.resetFields()
  userStore.removeToken()
  userStore.setUserInfo({})
  router.push('/login')
}
</script>

<template>
  <PageContainer title="重置密码">
    <el-row>
      <el-col :span="8">
        <el-form
          :model="formData"
          :rules="rules"
          label-position="right"
          label-width="100px"
          ref="formRef"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="formData.old_pwd" type="password" :show-password="true"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="formData.new_pwd" type="password" :show-password="true"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="formData.re_pwd" type="password" :show-password="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="onChangePwd">修改密码</el-button>
            <el-button type="info" size="large" @click="formRef.resetFields()">重置</el-button>
          </el-form-item>
        </el-form>
        <br />
      </el-col>
    </el-row>
  </PageContainer>
</template>

<style scoped></style>
