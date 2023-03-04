import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const uid = ref('')
  function signin() {
    uid.value = 'uid'
    // TODO request && router push to previous location
    router.push({ name: 'findEvents' })
  }
  function signout() {
    uid.value = ''
    // TODO request
    router.push({ name: 'signin' })
  }

  return { uid, signin, signout }
})
