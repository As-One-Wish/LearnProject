import type {
  OrderCreateParams,
  OrderDetail,
  OrderListParams,
  OrderListResult,
  OrderResult
} from '@/types/order'
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
/**
 * @description 获取订单详情
 */
export const getOrderByIdAPI = (id: string) => {
  return http<OrderDetail>({
    method: 'GET',
    url: `/member/order/${id}`
  })
}
/**
 * @description 获取再次购买订单
 */
export const getOrderRepurchaseAPI = (id: string) => {
  return http<OrderResult>({
    method: 'GET',
    url: `/member/order/repurchase/${id}`
  })
}

/**
 * @description 获取订单列表
 */
export const getOrderListAPI = (data: OrderListParams) => {
  return http<OrderListResult>({
    method: 'GET',
    url: '/member/order',
    data
  })
}
