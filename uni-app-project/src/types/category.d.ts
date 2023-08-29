import type { GoodsItem } from './global'

/** 一级分类项 */
export type CategoryTopItem = {
  id: string // id
  imageBanners: string[] // 一级分类图片集
  name: string //一级分类名
  picture: string // 一级分类图
  children: CategoryChildItem[] // 二级分类列表
}

/** 二级分类项 */
export type CategoryChildItem = {
  goods: GoodsItem[] // 商品集合
  id: string // id
  name: string // 二级分类名
  picture: string //二级分类图片
}
