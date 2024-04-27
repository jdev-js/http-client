import { useContext } from 'react'
import { httpContext } from './http-context'

export default function useToken() {
  const { token, setToken } = useContext(httpContext)

  const changeToken = (initialName, token) => {
    setToken(`${initialName} ${token}`)
  }

  return { token, changeToken }
}
