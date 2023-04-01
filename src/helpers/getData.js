import axios from 'axios'

export default async function getData(endpoint) {
  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (e) {
    console.error(e)
  }
}
