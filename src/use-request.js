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

  const abortController = new AbortController() // Abortador de request
  const abortRequest = () => {
    abortController.abort()
  }

  let configRequest = null
  if (body === null || body === undefined) {
    configRequest = {
      method: HTTP_URL.method,
      headers: headers.current,
      signal: abortController.signal,
    }
  } else {
    const formData = new FormData()
    Object.entries(body).forEach(([key, value]) => formData.append(key, value))
    configRequest = {
      body: formData,
      method: HTTP_URL.method,
      headers: headers.current,
      signal: abortController.signal,
    }
  }

  const sendRequest = useCallback((params) => {
    setTimeout(() => {
      if (data === null) {
        abortRequest()
      }
    }, timeAbort)
    const newEventRequestStart = new Event(EVENT.REQUESTSTART)
    window.dispatchEvent(newEventRequestStart) // evento de peticion fue enviada
    fetch(
      `${config.baseURL}${HTTP_URL.url}${params ? params : ''}`,
      configRequest
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        const newEventResponseReceived = new Event(EVENT.RESPONSERECEIVED)
        window.dispatchEvent(newEventResponseReceived) // Evento de respuesta recividad
      })
      .catch((error) => {
        const newEventRequestError = new Event(EVENT.REQUESTERROR)
        window.dispatchEvent(newEventRequestError) // Evento de error de peticion
        setIsError(true)
        setError(error)
      })
      .finally(() => {
        const newEventRequestEnd = new Event(EVENT.REQUESTEND) // Evento de que la peticion termino
        window.dispatchEvent(newEventRequestEnd)
        setIsLoading(false)
      })
  }, [])

  return { data, isLoading, isError, error, sendRequest, abortRequest }
}
