import axios from 'axios'

export default async function putData(endpoint, data) {
  try {
    const response = await axios.put(endpoint, data)

    return { data: response.data, success: true }
  } catch (e) {
    console.error(e)

    return { data: e.response.data, success: false }
  }
}
