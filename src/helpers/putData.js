import axios from 'axios'
import { useStorage } from '@vueuse/core'

export default async function putData(endpoint, data) {
  try {
    const token = useStorage('token', '')
    const response = await axios.put(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    return response.data
  } catch (e) {
    console.error(e)
  }
}
