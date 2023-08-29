import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '../../api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUserInfo = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    const setUserInfo = (object) => {
      user.value = object
    }

    return { token, setToken, removeToken, user, getUserInfo, setUserInfo }
  },
  {
    persist: true
  }
)
