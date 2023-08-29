import { http } from '@/utils/http'
import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/types/home'
import type { PageParams, PageResult } from '@/types/global'

/**
 * @description 获取首页轮播图-广告区域
 * @param distributionSite 表明请求源类型 1-首页
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite
    }
  })
}
/**
 * @description 获取首页分类
 */
export const getHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli'
  })
}
/**
 * @description 获取首页热门推荐
 */
export const getHomeHotAPI = () => {
  return http<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli'
  })
}
/**
 * @description 分页获取猜你喜欢列表
 * @param data 分页参数，可不传
 */
export const getHomeGuessAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data
  })
}
