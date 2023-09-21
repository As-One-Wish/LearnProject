import axios from 'axios'

const baseUrl = 'http://localhost:5288/api'

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
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => Promise.reject(error)
)

export default instance
