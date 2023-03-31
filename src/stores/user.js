import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import postData from '@/helpers/postData'

export const useUserStore = defineStore('user', () => {
  const token = ref(useStorage('token', ''))
  async function signin(email, password) {
    const response = await postData(`${import.meta.env.VITE_API_URL}/auth/signin`, {
      email,
      password
    })

    // token.value = response.token
    token.value = 's'
  }
  async function signup(email, username, dateOfBirth, password) {
    const response = await postData(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      email,
      username,
      dateOfBirth,
      password
    })

    // token.value = response.token
    token.value = 's'
  }
  async function signout() {
    token.value = ''
  }

  return { token, signin, signup, signout }
})
