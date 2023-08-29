import type { GoodsItem, PageResult } from './global'

/** 热门推荐-子类选项 */
export type SubTypeItem = {
  id: string // 子类id
  title: string // 子类标题
  goodsItems: PageResult<GoodsItem> // 子类对应的商品集合
}
/** 热门推荐 */
export type HotResult = {
  bannerPicture: string // 活动图片
  id: string // id
  subTypes: SubTypeItem[] // 子类选项
  title: string // 活动标题
}
