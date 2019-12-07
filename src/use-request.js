import { useCallback, useState } from 'react'
import useGlobalConfig from './use-global-config'
import { EVENT } from './constans'

export default function useRequest(nameRequest = '', body, timeAbort = 2000) {
  const { config, headers } = useGlobalConfig()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  const [HTTP_URL] = config.listURL.filter(
    (url) => url.nameRequest === nameRequest
  )

  const abortController = new AbortController()
  const abortRequest = () => {
    abortController.abort()
  }

  let configRequest = {
    method: HTTP_URL.method,
    headers: headers.current,
    signal: abortController.signal,
  }
  if (body !== null || body !== undefined) {
    const formData = new FormData()
    Object.entries(body).forEach(([key, value]) => formData.append(key, value))
    configRequest = {
      ...configRequest,
      body: formData,
    }
  }
  const sendRequest = useCallback((params) => {
    setTimeout(() => {
      if (data === null) {
        abortRequest()
      }
    }, timeAbort) // evento de peticion fue enviada
    fetch(`${config.baseURL}${HTTP_URL.url}${params ?? ''}`, configRequest)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        window.dispatchEvent(EVENT.RESPONSERECEIVED) // Evento de respuesta recividad
      })
      .catch((error) => {
        window.dispatchEvent(EVENT.REQUESTERROR) // Evento de error de peticion
        setIsError(true)
        setError(error)
      })
      .finally(() => {
        window.dispatchEvent(EVENT.REQUESTEND)
        setIsLoading(false)
      })
  }, [])

  return { data, isLoading, isError, error, sendRequest, abortRequest }
}
