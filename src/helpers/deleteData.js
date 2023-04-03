import axios from 'axios'
import { useStorage } from '@vueuse/core'

export default async function deleteData(endpoint, authorization = false) {
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

    const response = await axios.delete(endpoint, config)

    return response.data
  } catch (e) {
    console.error(e)
  }
}
