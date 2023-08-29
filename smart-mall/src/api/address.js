import request from '@/utils/request'

/**
 * @description 获取收获地址列表
 */
export const getAddressList = () => {
  return request.get('/address/list')
}
/**
 * @description 添加收货地址
 */
export const addAddressList = (name, phone, regions, detail) => {
  return request.post('/address/add', {
    form: {
      name: name,
      phone: phone,
      region: regions,
      detail: detail
    }
  })
}
