import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import postData from '@/utils/getData'
import updateLocalStorage from '@/utils/updateLocalStorage'
import getLocalStorage from '@/utils/getLocalStorage'

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
  function redirect(name, query = {}) {
    router.push({ name, query })
  }

  return { uid, signin, signup, signout, redirect }
})
