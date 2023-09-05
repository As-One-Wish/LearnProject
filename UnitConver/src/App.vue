<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const data_m = ref()
const data_ft = ref()
const formRef = ref()

const onChange = () => {
  const sour = parseFloat(data_m.value.trim())
  if (isNaN(sour)) {
    data_ft.value = ''
    data_m.value = ''
    ElMessage({
      type: 'error',
      message: '输入数据不合法'
    })
  }

  if (!isNaN(sour)) data_ft.value = Math.round(sour * 3.2808)
}
</script>

<template>
  <el-card class="card-container">
    <div class="form-container">
      <!-- 第一行 -->
      <el-form label-width="80px" ref="formRef">
        <el-form-item label="米(m)">
          <el-input v-model="data_m" @change="onChange" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="英尺(ft)">
          <el-input v-model="data_ft" readonly></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style scoped>
.card-container {
  width: 400px;
  margin: 20px auto;
  padding: 20px;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 水平居中 */
}

.arrow-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.arrow {
  font-size: 24px;
}
</style>
