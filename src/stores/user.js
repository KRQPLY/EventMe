import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import postData from '@/helpers/getData'
import updateLocalStorage from '@/helpers/updateLocalStorage'
import getLocalStorage from '@/helpers/getLocalStorage'

export const useUserStore = defineStore('user', () => {
  const url = 'http://localhost:3000/'
  const router = useRouter()
  const uid = ref(getLocalStorage('uid') || '')
  async function signin(email, password) {
    const response = await postData(`${url}auth`, { email, password })

    uid.value = response.uid
    updateLocalStorage('uid', response.uid)
  }
  async function signup(email, password, confirmedPassword) {
    const response = await postData(`${url}auth`, { email, password, confirmedPassword })

    uid.value = response.uid
    updateLocalStorage('uid', response.uid)
  }
  function signout() {
    uid.value = ''
    updateLocalStorage('uid', '')
  }

  return { uid, signin, signup, signout}
})
