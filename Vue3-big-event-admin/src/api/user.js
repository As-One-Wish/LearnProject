import request from '@/utils/request'

/**
 *@description 用户注册接口
 *@author HWJ
 *@date 2023-08-21 14:33:33
 */
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

/**
 *@description 用户登录接口
 *@author HWJ
 *@date 2023-08-21 15:05:01
 */
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
/**
 *@description 获取用户基本信息
 *@author HWJ
 *@date 2023-08-21 15:39:33
 */
export const userGetInfoService = () => request.get('/my/userinfo')
/**
 *@description 更新用户信息
 *@author HWJ
 *@date 2023-08-24 09:40:22
 */
export const userUpdateInfoService = (object) => request.put('/my/userinfo', object)
/**
 *@description 更新用户头像
 *@author HWJ
 *@date 2023-08-24 10:50:01
 */
export const userUpdateAvatarService = (avatar) => request.patch('/my/update/avatar', { avatar })
/**
 *@description 更新用户密码
 *@author HWJ
 *@date 2023-08-24 11:45:32
 */
export const userUpdatePasswordervice = (object) => request.patch('/my/updatepwd', object)
