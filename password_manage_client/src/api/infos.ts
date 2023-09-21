import type { InfoItem } from '@/types/common'
import request from '@/utils/request'

/**
 * @description 添加信息
 */
export const addInfo = (info: InfoItem) => {
  return request.post('/add', info)
}
