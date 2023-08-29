import store from '@/store/index'
import axios from 'axios'
import { showToast, showLoadingToast, closeToast } from 'vant'

/* 创建axios实例，将来对创建出来的实例进行自定义配置
 * 不会污染原始的axios
 */
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

/* 自定义配置 - 请求/响应 拦截器 */
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  showLoadingToast({
    message: '请求中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0 // 不会自动消失
  })
  // 只要有token，就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认axios会多包装一层，需要响应拦截器中处理一下)
  const res = response.data
  // 返回状态码不正确
  if (res.status !== 200) {
    showToast(res.message) // 默认单例模式
    return Promise.reject(res.message)
  } else {
    // 返回状态码正确，走业务逻辑，清楚loading效果
    closeToast()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
