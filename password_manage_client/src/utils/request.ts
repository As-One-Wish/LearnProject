import axios from 'axios'

const baseUrl = ''

/* 添加基地址和超时时间 */
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

/* 添加请求拦截器 */
instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

/* 添加响应拦截器 */
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => Promise.reject(error)
)
