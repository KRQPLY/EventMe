import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import postData from '@/helpers/postData'

export const useUserStore = defineStore('user', () => {
  const url = import.meta.env.VITE_API_URL
  const cookies = useCookies(['token'])
  const token = ref(cookies.get('token'))
  async function signin(email, password) {
    const response = await postData(`${url}/auth/signin`, { email, password })

    // to be deleted after backend setup
    cookies.set('token', 'kjlsddjasd')
    //
    token.value = cookies.get('token')
  }
  async function signup(email, username, dateOfBirth, password) {
    const response = await postData(`${url}/auth/signup`, {
      email,
      username,
      dateOfBirth,
      password
    })

    // to be deleted after backend setup
    cookies.set('token', 'kjlsddjasd')
    //
    token.value = cookies.get('token')
  }
  async function signout() {
    const response = await postData(`${url}/user/signout`)

    // to be deleted after backend setup
    cookies.remove('token')
    //
    token.value = cookies.get('token')
  }

  return { token, signin, signup, signout }
})
