import axios from 'axios'
import { useStorage } from '@vueuse/core'

export default async function postData(endpoint, data) {
  try {
    const token = useStorage('token', '')
    const response = await axios.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    return response.data
  } catch (e) {
    console.error(e)
  }
}
