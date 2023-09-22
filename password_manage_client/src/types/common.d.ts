/* 通用分页参数 */
export type PageParams = {
  page: number // 页码，默认为 1
  pageSize: number // 页大小，默认为 10
}
/* 通用信息类型 */
export type InfoItem = {
  id: string // 信息ID
  name: string // 信息名称
  isPassword: boolean // 信息类型 T->密码 F->普通
  content: string // 信息内容
  account?: string // 账号，isPassword=T 时使用
  comment?: string // 备注
}
