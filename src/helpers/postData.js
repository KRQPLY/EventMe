import axios from 'axios'

export default async function postData(endpoint, data) {
  try {
    const response = await axios.post(endpoint, data)

    return response.data
  } catch (e) {
    console.error(e)
  }
}
