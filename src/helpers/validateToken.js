import { useStorage } from '@vueuse/core'
import parseJwt from './parseJwt'

export default function validateToken() {
  const token = useStorage('token', '')

  if (!token.value) {
    return false
  }

  const parsedToken = parseJwt(token.value)

  if (!parsedToken) {
    return false
  }

  const tokenExp = new Date(parsedToken.exp * 1000)
  const timeNow = new Date()

  return timeNow < tokenExp
}
