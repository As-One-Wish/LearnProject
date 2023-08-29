import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'

/**
 * @description 根据ID获取商品详情
 */
export const getGoodsByIdAPI = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: {
      id
    }
  })
}
