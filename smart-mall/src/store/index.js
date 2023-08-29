import { createStore } from 'vuex'
import user from './modules/user'
import cart from './modules/cart'

export default createStore({
  state: {
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    },
    isLogined (state, getters) {
      return !!getters.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  }
})
