import axios from 'axios'

export default async function postData(endpoint, data) {
  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        'content-type': 'application/json'
      }
    })

    return response.data
  } catch (e) {
    console.error(e)
  }
}
