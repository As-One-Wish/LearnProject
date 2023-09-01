import type { OrderCreateParams, OrderResult } from '@/types/order'
import { http } from '@/utils/http'

/**
 * @description 获取预支付订单
 */
export const getOrderPreAPI = () => {
  return http<OrderResult>({
    method: 'GET',
    url: '/member/order/pre'
  })
}
/**
 * @description 获取立即购买订单
 */
export const getOrderBuyNowAPI = (data: { skuId: string; count: number; addressId?: string }) => {
  return http<OrderResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data
  })
}
/**
 * @description 提交订单
 */
export const postOrderAPI = (data: OrderCreateParams) => {
  return http<{ id: string }>({
    method: 'POST',
    url: '/member/order',
    data
  })
}
