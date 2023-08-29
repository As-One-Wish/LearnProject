import request from '@/utils/request'

/**
 * @description 订单结算
 * @param object cart => {cartIds};buyNow => {goodsId, goodsNum, goodsSkuId}
 */
export const orderSettle = (mode, object) => {
  return request.get('/checkout/order', {
    params: {
      mode: mode, // cart  buynow
      delivery: 10, // 10 快递配送  20 门店自提
      couponId: 0, // 优惠券ID  0-不使用优惠券
      isUsePoints: 0, // 积分 0-不使用积分
      ...object // 将传递来的对象动态展开
    }

  })
}
/**
 * @description 订单提交
 */
export const orderSubmit = (mode, object) => {
  return request.post('/checkout/submit', {
    mode: mode, // cart  buynow
    delivery: 10, // 10 快递配送  20 门店自提
    couponId: 0, // 优惠券ID  0-不使用优惠券
    isUsePoints: 0, // 积分 0-不使用积分
    payType: 10, // 余额支付
    ...object // 将传递来的对象动态展开
  })
}
/**
 *@description 获取我的订单列表
 *@author HWJ
 *@date 2023-08-18 10:21:18
*/
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
