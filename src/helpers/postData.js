import axios from "axios"

export default async function postData(endpoint, data) {
  try {
    const response = await axios.post(endpoint, data)

    return response.data
  } catch (e) {
    if (typeof e === 'string') {
      console.error(e.toUpperCase())
    } else if (e instanceof Error) {
      console.error(e.message)
    }
  }
}
