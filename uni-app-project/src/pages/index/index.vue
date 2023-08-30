<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeletons from './components/PageSkeletons.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useGuessList } from '@/composables'

const bannerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotList = ref<HotItem[]>([])

// 获取前台轮播图数据
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取前台分类数据
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取前台热门推荐数据
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 猜你喜欢组件滚动触底
const { guessRef, onScrolltolower } = useGuessList()

const isTriggered = ref(false)
const isLoading = ref(false)
// 下拉刷新
const onRefresh = async () => {
  isTriggered.value = true
  // 等待所有函数执行结束取消加载状态
  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  guessRef.value?.getMore()
  isTriggered.value = false
}

onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar></CustomNavbar>
  <scroll-view
    :refresher-enabled="true"
    @refresherrefresh="onRefresh"
    :refresher-triggered="isTriggered"
    scroll-y
    class="scroll-view"
    @scrolltolower="onScrolltolower"
  >
    <!-- 骨架屏 -->
    <PageSkeletons v-if="isLoading"></PageSkeletons>
    <template v-else>
      <!-- 自定义轮播图 -->
      <MallSwiper :list="bannerList"></MallSwiper>
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList"></CategoryPanel>
      <!-- 热门推荐 -->
      <HotPanel :list="hotList"></HotPanel>
      <!-- 猜你喜欢 -->
      <MallGuess ref="guessRef"></MallGuess>
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
