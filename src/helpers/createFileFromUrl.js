import axios from 'axios'

export default async function createFileFromUrl(url, defaultType = 'image/jpeg') {
  try {
    const name = /[^/]*$/.exec(url)[0]
    const response = await axios.get(url, { responseType: 'blob' })
    const data = response.data

    return new File([data], name, {
      type: data.type || defaultType
    })
  } catch (error) {
    console.error(error)

    return null
  }
}
