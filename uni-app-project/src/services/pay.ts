import type { OrderDetail, OrderLogisticResult } from '@/types/order'
import { http } from '@/utils/http'

/**
 * @description 获取微信支付参数
 */
export const getPayWxMiniPayAPI = (data: { orderId: string }) => {
  return http<WechatMiniprogram.RequestPaymentOption>({
    method: 'GET',
    url: '/pay/wxPay/miniPay',
    data
  })
}
/**
 * @description 模拟支付
 */
export const getPayMockAPI = (data: { orderId: string }) => {
  return http({
    method: 'GET',
    url: '/pay/mock',
    data
  })
}
/**
 * @description 模拟发货
 */
export const getOrderConsignmentAPI = (id: string) => {
  return http({
    method: 'GET',
    url: `/member/order/consignment/${id}`
  })
}
/**
 * @description 确认收货
 */
export const putOrderReceiptAPI = (id: string) => {
  return http<OrderDetail>({
    method: 'PUT',
    url: `/member/order/${id}/receipt`
  })
}
/**
 * @description 获取商品物流信息
 */
export const getLogisticsAPI = (id: string) => {
  return http<OrderLogisticResult>({
    method: 'GET',
    url: `/member/order/${id}/logistics`
  })
}
/**
 * @description 删除订单
 */
export const deleteOrderAPI = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/order',
    data
  })
}
