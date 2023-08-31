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
export const deleteCartItemsAPI = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data
  })
}
/**
 * @description 修改购物车单品
 * @param data selectd 选中状态 count 修改数量
 * @returns
 */
export const putCartItemBySkuIdAPI = (
  skuId: string,
  data: { selected?: boolean; count?: number }
) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data
  })
}
/**
 * @description 购物车全选反选
 * @param data 全选反选状态
 * @returns
 */
export const putCartSelectedAPI = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data
  })
}
