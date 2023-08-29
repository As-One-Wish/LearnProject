import type { GoodsItem } from './global'

/** 商品信息 */
export type GoodsResult = {
  id: string // id
  name: string // 商品名称
  desc: string // 商品描述
  price: number // 当前价格
  oldPrice: number // 原价
  details: Details // 商品详情
  mainPictures: string[] // 主图图片集合
  similarProducts: GoodsItem[] // 同类商品
  skus: SkuItem[] // 可选规格集合
  specs: SpecItem[] // 可选规格结合备注
  userAddresses: AddressItem[] // 用户地址列表
}

/** 商品详情 */
export type Details = {
  pictures: string[] // 详情图片集合
  properties: DetailsPropertyItem[] // 详情属性集合
}

/** 详情属性 */
export type DetailsPropertyItem = {
  name: string // 属性名称
  value: string // 属性值
}

/** sku信息 */
export type SkuItem = {
  id: string // id
  picture: string // 规格图片
  price: number // 规格价格
  skuCode: string // 规格码
  inventory: number // 库存
  oldPrice: number // 原价
  specs: SkuSpecItem[] // 规格信息集合
}

/** 规格信息 */
export type SkuSpecItem = {
  name: string // 规格名称
  valueName: string // 可选值名称
}

/** 可选规格信息 */
export type SpecItem = {
  name: string // 规格名称
  values: SpecValueItem[] // 可选值集合
}

/** 可选值信息 */
export type SpecValueItem = {
  available: boolean // 是否可售
  desc: string // 可选值备注
  name: string // 可选值名称
  picture: string // 可选值图片链接
}

/** 地址信息 */
export type AddressItem = {
  receiver: string // 收货人姓名
  contact: string // 联系方式
  provinceCode: string // 省份编码
  cityCode: string // 城市编码
  countyCode: string // 区/县编码
  address: string // 详细地址
  isDefault: number // 默认地址，1为是，0为否
  id: string // 收货地址 id
  fullLocation: string // 省市区
}
