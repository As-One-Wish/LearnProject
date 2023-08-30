import type { ProfileDetail } from '@/types/member'
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
