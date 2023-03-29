import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import postData from '@/helpers/postData'

export const useUserStore = defineStore('user', () => {
  const url = import.meta.env.VITE_API_URL
  const token = ref(useStorage('token', ''))
  async function signin(email, password) {
    const response = await postData(`${url}/auth/signin`, { email, password })

    token.value = response.token
  }
  async function signup(email, username, dateOfBirth, password) {
    const response = await postData(`${url}/auth/signup`, {
      email,
      username,
      dateOfBirth,
      password
    })

    token.value = response.token
  }
  async function signout() {
    const response = await postData(`${url}/user/signout`)

    token.value = ''
  }

  return { token, signin, signup, signout }
})
