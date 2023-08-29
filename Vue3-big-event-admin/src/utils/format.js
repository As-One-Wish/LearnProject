import { dayjs } from 'element-plus'

/**
 *@description 时间格式化
 *@author HWJ
 *@date 2023-08-23 08:59:46
 */
export const formatTime = (time) => dayjs(time).format('YYYY年MM年DD日')

/**
 *@description Object 值对比
 *@author HWJ
 *@date 2023-08-23 08:59:57
 */
export const objCom = (obj1, obj2) => {
  const obj1_keys = Object.keys(obj1).length
  const obj2_keys = Object.keys(obj2).length
  // 对象key值数量不一样，代表不是一个对象
  if (obj1_keys !== obj2_keys) return false
  // 一样的话就比对每一个key值
  for (const key in obj1_keys > obj2_keys ? obj2 : obj1) {
    if (obj1[key] !== obj2[key]) return true
  }
  return false
}
