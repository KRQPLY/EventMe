import axios from 'axios'
import { useStorage } from '@vueuse/core'

export default async function getData(endpoint) {
  try {
    const token = useStorage('token', '')
    const response = await axios.get(endpoint, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token.value}`
      }
    })

    return response.data
  } catch (e) {
    console.error(e)
  }
}
