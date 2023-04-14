import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import postData from '@/helpers/postData'
import deleteData from '@/helpers/deleteData'

export const useUserStore = defineStore('user', () => {
  const token = useStorage('token', '')
  const username = useStorage('username', '')

  async function signin(email, password) {
    const response = await postData(`${import.meta.env.VITE_API_URL}/auth/signin`, {
      email,
      password
    })

    if (response.success) {
      token.value = response.data.token
      username.value = response.data.username
    } else {
      return response.data
    }
  }

  async function signup(email, nick, dateOfBirth, password) {
    const response = await postData(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      email,
      username: nick,
      dateOfBirth,
      password
    })

    if (response.success) {
      token.value = response.data.token
      username.value = response.data.username
    } else {
      return response.data
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
