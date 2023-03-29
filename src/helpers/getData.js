import axios from 'axios'

export default async function getData(endpoint) {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        'content-type': 'application/json'
      }
    })

    return response.data
  } catch (e) {
    if (typeof e === 'string') {
      console.error(e.toUpperCase())
    } else if (e instanceof Error) {
      console.error(e.message)
    }
  }
}
