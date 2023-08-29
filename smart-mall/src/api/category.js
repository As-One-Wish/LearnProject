import request from '@/utils/request'

/**
 * @description 获取分类数据
 */
export const getCategoryData = () => {
  return request.get('/category/list')
}
