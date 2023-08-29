import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

/**
 * @description 热门推荐通用请求接口
 * @param url 请求地址
 * @param data 请求参数
 */
export const getHotRecommendAPI = (url: string, data?: PageParams & { subType?: string }) => {
  return http<HotResult>({
    method: 'GET',
    url: url,
    data
  })
}
