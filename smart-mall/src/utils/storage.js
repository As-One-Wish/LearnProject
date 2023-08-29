const USER_INFO_KEY = 'mall_user_info'
const SEARCH_HISTORY_KEY = 'search_history_key'

/**
 * @description 获取个人信息--持久化
 */
export const getInfo = () => {
  const result = localStorage.getItem(USER_INFO_KEY)
  return result ? JSON.parse(result) : { token: '', userId: '' }
}
/**
 * @description 设置个人信息--持久化
 */
export const setInfo = (object) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(object))
}
/**
 * @description 移除个人信息--持久化
 */
export const removeInfo = () => {
  localStorage.removeItem(USER_INFO_KEY)
}
/**
 * @description 获取搜索历史--持久化
 */
export const getHistoryList = () => {
  const result = localStorage.getItem(SEARCH_HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
/**
 * @description 设置搜索历史--持久化
 */
export const setHistoryList = (array) => {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(array))
}
