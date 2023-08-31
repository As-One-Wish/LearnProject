import type { CartItem } from '@/types/cart'
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
/**
 * @description 获取购物车列表
 */
export const getCartListAPI = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart'
  })
}
/**
 * @description 删除购物车单品或者清空
 */
export const deleteCartItemsAPI = (data: string[]) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data
  })
}
