import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

type LoginParams = {
  encryptedData: string
  code: string
  iv: string
}

/**
 * @description 登录接口，需要小程序app
 * @param data 包含登录必须参数
 */
export const postLoginWxMinAPI = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data
  })
}
/**
 * @description 登录接口，开发时测试使用
 * @param phone 手机号码
 */
export const postLoginWxMinTestAPI = (phone: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber: phone
    }
  })
}
