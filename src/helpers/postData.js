import axios from 'axios'

export default async function postData(endpoint, data) {
  try {
    const response = await axios.post(endpoint, data)

    return { data: response.data, success: true }
  } catch (e) {
    console.error(e)

    return { data: e.response.data, success: false }
  }
}
