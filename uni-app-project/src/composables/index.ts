import type { MallGuessInstance } from '@/types/component'
import { ref } from 'vue'

export const useGuessList = () => {
  // 猜你喜欢组件操作
  const guessRef = ref<MallGuessInstance>()
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }

  // 返回 ref 和 事件处理函数
  return {
    guessRef,
    onScrolltolower
  }
}
