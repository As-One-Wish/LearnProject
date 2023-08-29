import MallSwiper from '@/components/MallSwiper.vue'
import MallGuess from '@/components/MallGuess.vue'

import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    MallSwiper: typeof MallSwiper
    MallGuess: typeof MallGuess
  }
}

// 组件实例类型
export type MallGuessInstance = InstanceType<typeof MallGuess>
