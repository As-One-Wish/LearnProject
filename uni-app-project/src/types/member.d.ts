/** 用户基本通用信息 */
type BaseUserInfo = {
  account: string // 账户
  avatar: string // 头像
  id: number // id
  nickname?: string // 昵称
}

/** 小程序登录 用户返回信息 */
export type LoginResult = BaseUserInfo & {
  mobile: string // 手机号
  token: string // 登录凭证
}

/** 个人信息 用户详情信息 */
export type ProfileDetail = BaseUserInfo & {
  gender?: string // 性别
  birthday?: string // 生日
  fullLocation: string // 省市区的名称
  profession?: string // 职业
}

export type Gender = '男' | '女'

/** 修改个人信息接口参数 */
export type ProfileParams = Pick<ProfileDetail, 'nickname' | 'gender' | 'birthday' | 'profession'> &
  BaseAddrInfo

/** 基本地址信息 */
type BaseAddrInfo = {
  id: string // id
  provinceCode?: string // 省份编码
  cityCode?: string // 城市编码
  countyCode?: string // 区/县编码
}

/** 添加收货地址信息参数 */
export type AddressItem = BaseAddrInfo & {
  receiver: string // 收货人姓名
  contact: string // 联系方式
  address: string // 详细地址
  isDefault: number // 是否默认地址
}
/** 收货地址信息 */
export type DeliveryAddress = AddressItem & {
  fullLocation: string // 省市区
}
