import type { GoodsItem } from './global'

/** 首页-广告区域数据类型 **/
export type BannerItem = {
  hreUrl: string // 跳转链接
  id: string // id
  imgUrl: string // 图片链接
  type: number // 跳转类型
}
/** 首页-分类数据类型 **/
export type CategoryItem = {
  id: string // id
  name: string // 分类名字
  icon: string // 分类图标
}
/** 首页-热门数据类型 **/
export type HotItem = {
  id: string // id
  alt: string // 推荐说明
  pictures: string[] // 图片集合
  target: string // 跳转地址
  title: string // 推荐标题
  type: string // 推荐类型
}
/** 猜你喜欢数据类型 **/
export type GuessItem = GoodsItem
