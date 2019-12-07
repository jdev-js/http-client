import useGlobalConfig from './use-global-config'

export default function useInterceptors() {
  const { headers } = useGlobalConfig()

  const setItem = (key, value) => {
    headers.current = {
      ...headers,
      [key]: value,
    }
  }
  const deleteItem = (key) => {
    let newHeaders = {}
    Object.entries(headers.current).forEach(([keyValue, value]) => {
      if (keyValue !== key) {
        newHeaders[keyValue] = value
      }
    })
    headers.current = newHeaders
  }
  const clear = () => {
    headers.current = {}
  }

  return { headers, setItem, deleteItem, clear }
}
