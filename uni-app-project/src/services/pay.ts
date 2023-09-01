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
