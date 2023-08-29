<!-- 
 * @description 分类下拉框组件
 * @fileName ChannelSelect.vue 
 * @author HWJ 
 * @date 2023-08-22 11:58:05
!-->
<script setup>
import { articleGetChannelsService } from '@/api/article.js'
import { ref } from 'vue'

const cateList = ref([])
const getCateList = async () => {
  const res = await articleGetChannelsService()
  cateList.value = res.data.data
}
getCateList()

defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:model-value'])
</script>

<template>
  <el-select
    :model-value="modelValue"
    @update:model-value="emit('update:model-value', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="item in cateList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<style scoped></style>
