import axios from 'axios'

export default async function uploadImage(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  try {
    const response = await axios.post(apiUrl, formData)

    return response.data.secure_url
  } catch (e) {
    console.error(e)
  }
}
