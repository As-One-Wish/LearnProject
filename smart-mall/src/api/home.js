import request from '@/utils/request'

/**
 * @description 获取首页数据
 */
export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
