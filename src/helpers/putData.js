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

    return { data: response.data, success: true }
  } catch (e) {
    console.error(e)

    return { data: e.response.data, success: false }
  }
}
