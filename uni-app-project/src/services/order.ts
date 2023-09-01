import type { OrderPreResult } from '@/types/order'
import { http } from '@/utils/http'

/**
 * @description 获取预支付订单
 */
export const getOrderPreAPI = () => {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre'
  })
}
