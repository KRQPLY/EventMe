import { ref } from 'vue'
import { defineStore } from 'pinia'
import getData from '@/helpers/getData'
import updateLocalStorage from '@/helpers/updateLocalStorage'
import getLocalStorage from '@/helpers/getLocalStorage'

export const useUserStore = defineStore('user', () => {
  const url = import.meta.env.VITE_API_URL
  const uid = ref(getLocalStorage('uid') || '')
  async function signin(email, password) {
    const response = await getData(`${url}auth`, { email, password })

    uid.value = response.uid
    updateLocalStorage('uid', response.uid)
  }
  async function signup(email, password, confirmedPassword) {
    const response = await getData(`${url}auth`, { email, password, confirmedPassword })

    uid.value = response.uid
    updateLocalStorage('uid', response.uid)
  }
  function signout() {
    uid.value = ''
    updateLocalStorage('uid', '')
  }

  return { uid, signin, signup, signout }
})
