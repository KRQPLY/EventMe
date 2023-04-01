import axios from 'axios'
import { useStorage } from '@vueuse/core'

export default async function getData(endpoint) {
  try {
    const token = useStorage('token', '')
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    return response.data
  } catch (e) {
    console.error(e)
  }
}
