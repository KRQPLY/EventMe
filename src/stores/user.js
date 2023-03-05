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

    // TODO router push to previous location
    router.push({ name: 'findEvents' })
  }
  async function signup(email, password, confirmedPassword) {
    const response = await postData(`${url}auth`, { email, password, confirmedPassword })

    uid.value = response.uid
    updateLocalStorage('uid', response.uid)

    // TODO router push to previous location
    router.push({ name: 'findEvents' })
  }
  function signout() {
    uid.value = ''
    updateLocalStorage('uid', '')

    router.push({ name: 'signin' })
  }

  return { uid, signin, signup, signout }
})
