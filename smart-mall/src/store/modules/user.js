import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, object) {
      state.userInfo = object
      setInfo(object)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})

      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {

  }
}
