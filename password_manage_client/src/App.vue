<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <div class="body">
    <el-config-provider :locale="zhCn">
      <RouterView></RouterView>
    </el-config-provider>
  </div>
  <!-- <el-config-provider :locale="zhCn">
    <RouterView></RouterView>
  </el-config-provider> -->
</template>

<style scoped lang="less">
.body {
  font-family: 'JetBrains Mono', 'KaiTi';
  font-weight: bold;
  font-size: larger;
}
</style>
