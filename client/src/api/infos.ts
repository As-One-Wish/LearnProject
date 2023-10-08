import type { InfoItem, PageParams } from '@/types/common'
import request from '@/utils/request'

/**
 * @description 添加信息
 */
export const addInfo = (info: InfoItem) => {
  return request.post('/info/add', info)
}
/**
 * @description 获取信息列表
 */
export const getInfoList = (pageParams: PageParams) => {
  return request.post('/info/list', pageParams)
}
/**
 * @description 修改信息
 */
export const updateInfo = (info: InfoItem) => {
  return request.put('/info/update', info)
}
/**
 * @description 删除信息
 */
export const deleteInfo = (ids: string[]) => {
  return request.delete('/info/delete', { data: ids })
}
/**
 * @description 获取单条信息
 */
export const getSingelInfo = (id: string) => {
  return request.get(`/info/single/${id}`)
}
