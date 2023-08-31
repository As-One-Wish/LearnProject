import { http } from '@/utils/http'

/**
 * @description 添加购物车
 */
export const postAddCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data
  })
}
