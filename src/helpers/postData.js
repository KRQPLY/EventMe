import axios from 'axios'
import { useStorage } from '@vueuse/core'

export default async function postData(endpoint, data, authorization = false) {
  try {
    const token = useStorage('token', '')
    let config
    if (authorization) {
      config = {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }
    }
    const response = await axios.post(endpoint, data, config)

    return response.data
  } catch (e) {
    console.error(e)
  }
}
