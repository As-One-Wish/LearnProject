/** 购物车商品项 */
export type CartItem = {
  id: string //
  name: string // 商品名称
  picture: string // 商品图片
  price: number // 加入时价格
  count: number // 数量
  skuId: string // sku id
  attrsText: string // 属性文字
  selected: boolean // 是否选中
  nowPrice: number // 当前价格
  stock: number // 库存
  isCollect: boolean // 是否收藏
  discount: number // 折扣信息
  isEffective: boolean // 是否为有效商品
}
