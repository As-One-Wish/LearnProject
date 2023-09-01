import type { AddressItem, ProfileDetail, ProfileParams } from '@/types/member'
import { http } from '@/utils/http'

/**
 * @description 获取用户信息
 */
export const getMemberProfileAPI = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile'
  })
}
/**
 * @description 修改用户信息
 */
export const putMemberProfileAPI = (data: ProfileParams) => {
  return http<ProfileDetail>({
    method: 'PUT',
    url: '/member/profile',
    data
  })
}
/**
 * @description 新增地址
 * @returns 返回地址ID-Integer
 */
export const postMemberAddress = (data: AddressItem) => {
  return http<number>({
    method: 'POST',
    url: '/member/address',
    data
  })
}
/**
 * @description 获取收货地址列表
 */
export const getAddressListAPI = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address'
  })
}
/**
 * @description 获取对应ID收货地址的信息
 */
export const getAddressInfoAPI = (id: string) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`
  })
}
/**
 * @description 修改对应ID收货地址的信息
 */
export const putAddressInfoAPI = (id: string, data: AddressItem) => {
  return http<string>({
    method: 'PUT',
    url: `/member/address/${id}`,
    data
  })
}
/**
 * @description 删除对应ID收货地址
 */
export const deleteAddressInfoAPI = (id: string) => {
  return http<string>({
    method: 'DELETE',
    url: `/member/address/${id}`
  })
}
