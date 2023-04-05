import axios from 'axios'
import { useStorage } from '@vueuse/core'

export default async function validateToken() {
  const token = useStorage('token', '')
  const username = useStorage('username', '')

  if (!token.value) {
    return false
  }

  try {
    await axios.get(`${import.meta.env.VITE_API_URL}/user/is-token-valid`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    return true
  } catch (e) {
    console.error(e)

    token.value = ''
    username.value = ''

    return false
  }
}
