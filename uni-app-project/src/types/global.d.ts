/** 通用分页结果类型 */
export type PageResult<T> = {
  items: T[] // 列表数据
  count: number // 总条数
  page: number // 当前页数
  pages: number // 总页数
  pageSize: number // 每页条数
}
/** 通用分页参数 */
export type PageParams = {
  page?: number // 页码：默认值为 1
  pageSize?: number // 页大小：默认值为 10
}
/** 通用商品类型 */
export type GoodsItem = {
  desc: string // 商品描述
  discount: number // 商品折扣
  id: string // id
  name: string // 商品名称
  picture: string // 商品图片
  price: number // 商品价格
  orderNum: number // 商品已下单数量
}
