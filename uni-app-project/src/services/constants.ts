/** 订单状态枚举 */
export enum OrderState {
  /** 待付款 */
  AWAIT_PAYMENT = 1,
  /** 待发货 */
  AWAIT_SHIPMENT = 2,
  /** 待收货 */
  AWAIT_RECEIPT = 3,
  /** 待评价 */
  AWAIT_EVALUATE = 4,
  /** 已完成 */
  COMPLETED = 5,
  /** 已取消 */
  CANCELLED = 6
}

/** 订单状态列表 */
export const orderStateList = [
  { id: 0, text: '' },
  { id: 1, text: '待付款' },
  { id: 2, text: '待发货' },
  { id: 3, text: '待收货' },
  { id: 4, text: '待评价' },
  { id: 5, text: '已完成' },
  { id: 6, text: '已取消' }
]
