import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'

/**
 * @description 获取分类页面结构
 */
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top'
  })
}
