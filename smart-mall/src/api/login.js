import request from '@/utils/request'

// 此处存放所有与登录相关的接口请求
/**
 * @description 获取图形验证码
 */
export const getPicCaptcha = () => {
  return request.get('/captcha/image')
}
/**
 * @description 获取短信验证码
 */
export const getMsgCaptcha = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}
/**
 * @description  用户登录接口
 */
export const userLogin = (phoneNumber, msgCaptcha) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile: phoneNumber,
      partyData: {},
      smsCode: msgCaptcha
    }
  })
}
