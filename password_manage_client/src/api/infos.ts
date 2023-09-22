import type { InfoItem, PageParams } from '@/types/common'
import request from '@/utils/request'

/**
 * @description 添加信息
 */
export const addInfo = (info: InfoItem) => {
  return request.post('/add', info)
}
/**
 * @description 获取信息列表
 */
export const getInfoList = (pageParams: PageParams) => {
  return request.get('/list', { params: pageParams })
}
/**
 * @description 修改信息
 */
export const updateInfo = (info: InfoItem) => {
  return request.put('/update', { ...info })
}
/**
 * @description 删除信息
 */
export const deleteInfo = (names: string[]) => {
  return request.delete('/delete', { params: names })
}
