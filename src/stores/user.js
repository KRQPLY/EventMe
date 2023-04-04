import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import postData from '@/helpers/postData'
import deleteData from '@/helpers/deleteData'

export const useUserStore = defineStore('user', () => {
  const token = ref(useStorage('token', ''))
  const username = ref(useStorage('username', ''))
  async function signin(email, password) {
    const response = await postData(`${import.meta.env.VITE_API_URL}/auth/signin`, {
      email,
      password
    })

    if (response.token) {
      token.value = response.token
      username.value = response.username
    }
  }
  async function signup(email, nick, dateOfBirth, password) {
    const response = await postData(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      email,
      username: nick,
      dateOfBirth,
      password
    })

    if (response.token) {
      token.value = response.token
      username.value = response.username
    }
  }
  function signout() {
    token.value = ''
    username.value = ''
  }
  async function removeAccount() {
    await deleteData(`${import.meta.env.VITE_API_URL}/user/remove`, true)
    signout()
  }

  return { token, username, signin, signup, signout, removeAccount }
})
