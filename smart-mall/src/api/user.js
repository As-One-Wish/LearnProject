import request from '@/utils/request'

/**
 *@description 获取个人信息
 *@author HWJ
 *@date 2023-08-18 11:29:53
*/
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
