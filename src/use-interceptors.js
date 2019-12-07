import useGlobalConfig from './use-global-config'

export default function useInterceptors() {
  const { headers } = useGlobalConfig()

  const setItem = (key, value) => {
    headers.current = {
      ...headers,
      [key]: value,
    }
  }

  return { headers, setItem }
}
