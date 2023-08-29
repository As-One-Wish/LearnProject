<!-- 
 * @description 更换头像
 * @fileName UserAvatar.vue 
 * @author HWJ 
 * @date 2023-08-21 11:33:38
!-->
<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { userUpdateAvatarService } from '@/api/user.js'
import { Plus, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/index.js'

const userStore = useUserStore()
const uploadRef = ref()
const imageUrl = ref(userStore.user.user_pic)
const isLoading = ref(false)

const onSelectFile = (uploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}

const onUpdateAvatar = async () => {
  isLoading.value = true
  await userUpdateAvatarService(imageUrl.value)
  await userStore.getUserInfo()
  ElMessage.success('头像修改成功')
  isLoading.value = false
}
</script>

<template>
  <PageContainer title="更换头像">
    <el-row>
      <el-col :span="12">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
          ref="uploadRef"
          v-loading="isLoading"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> </el-upload
      ></el-col>
    </el-row>
    <br />
    <el-button
      type="primary"
      :icon="Plus"
      size="large"
      @click="uploadRef.$el.querySelector('input').click()"
      >选择图片</el-button
    >
    <el-button type="success" :icon="Upload" size="large" @click="onUpdateAvatar"
      >上传头像</el-button
    >
  </PageContainer>
</template>

<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
