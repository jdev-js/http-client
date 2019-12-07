import { useContext } from 'react'
import { httpContext } from './http-context'

export default function useGlobalConfig() {
  const { config, changeConfig, headers } = useContext(httpContext)

  return {
    config,
    headers,
    changeConfig,
  }
}
