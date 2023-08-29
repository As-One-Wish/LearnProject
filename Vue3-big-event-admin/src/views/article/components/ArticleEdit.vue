<script setup>
import { ref } from 'vue'
import {
  articleAddArticleService,
  articleGetDetailService,
  articleEditArticlesService
} from '@/api/article.js'
import { baseURL } from '@/utils/request.js'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import axios from 'axios'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const visibleDrawer = ref(false)
const isLoading = ref(false)

const articleInfo = ref()
const setDefault = () => {
  articleInfo.value = {
    title: '',
    cate_id: '',
    content: '<p><br></p>',
    cover_img: '',
    state: ''
  }
}
setDefault()
const rules = {
  title: [
    { required: true, message: '文章标题不能为空', trigger: 'blur' },
    { pattern: /^\S{3,15}$/, message: '标题必须为3-15位非空字符', trigger: 'blur' }
  ],
  cate_id: [{ required: true, message: '文章分类不能为空', trigger: 'blur' }],
  content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
  cover_img: [{ required: true, message: '文章封面不能为空', trigger: 'blur' }]
}

const open = async (object) => {
  visibleDrawer.value = true
  if (object.id) {
    isLoading.value = true
    // id存在，是编辑
    const res = await articleGetDetailService(object.id)
    articleInfo.value = res.data.data
    imgUrl.value = baseURL + articleInfo.value.cover_img
    articleInfo.value.cover_img = await imageUrlToFileObject(
      imgUrl.value,
      articleInfo.value.cover_img
    )
    isLoading.value = false
  } else {
    imgUrl.value = ''
    setDefault()
  }
}

const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  // 本地预览
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  articleInfo.value.cover_img = uploadFile.raw
}

const formRef = ref()

const emit = defineEmits(['success'])
/**
 *@description 发布/编辑文章函数
 *@author HWJ
 *@date 2023-08-23 08:38:53
 */
const onPublishArticle = async (preState) => {
  await formRef.value.validate()
  articleInfo.value.state = preState
  const fd = new FormData()
  for (let key in articleInfo.value) fd.append(key, articleInfo.value[key])
  if (articleInfo.value.id) {
    // id存在，编辑
    await articleEditArticlesService(fd)
    ElMessage.success('文章修改成功')
    emit('success', 'edit')
  } else {
    // id不存在，新增
    await articleAddArticleService(fd)
    ElMessage.success('文章添加成功')
    emit('success', 'add')
  }
  visibleDrawer.value = false
}

/**
 *@description 将图片网络地址转化为file对象
 *@author HWJ
 *@date 2023-08-23 10:21:24
 */
async function imageUrlToFileObject(imageUrl, fileName) {
  try {
    // 使用 Axios 发送 GET 请求获取图片数据
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer' // 请求的数据类型为二进制数组
    })

    // 将获取到的图片数据转换为 Blob 对象
    const blob = new Blob([response.data], { type: response.headers['content-type'] })

    // 创建一个 File 对象，将 Blob 对象作为参数传递给它
    const file = new File([blob], fileName, { type: response.headers['content-type'] })

    return file
  } catch (error) {
    console.error('Error fetching or converting image:', error)
    return null
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="articleInfo.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="40%"
  >
    <!-- 发表文章表单 -->
    <el-form
      :model="articleInfo"
      ref="formRef"
      label-width="100px"
      v-loading="isLoading"
      :rules="rules"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="articleInfo.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelSelect v-model="articleInfo.cate_id" width="100%"></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 此处需要关闭element-plus的自动上传，不需要配置action等参数，只需要本地预览图片即可 -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            theme="snow"
            v-model:content="articleInfo.content"
            content-type="html"
          ></QuillEditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublishArticle('已发布')">发布</el-button>
        <el-button type="info" @click="onPublishArticle('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
