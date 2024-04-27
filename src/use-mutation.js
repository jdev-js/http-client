import { useCallback, useRef, useState } from 'react'
import useClient from './use-client'
import ErrorRequest from './ErrorRequest'
/**
 *
 * @param {string} nameMutation
 * @param {Array<string>} params
 * @param {{}} body
 */
export default function useMutation(nameMutation, params = [], body = {}) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(true)
  const [isError, setIsError] = useState(false)
  const propertyFetch = useRef(null)

  const { baseUrl, mutationsList: mutations, headersRequest } = useClient()
  const mutationFetch = mutations.filter(
    (mutation) => mutation.name.toLowerCase() === nameMutation.toLowerCase()
  )[0]

  const mutation = useCallback(() => {
    const paramsRequest = params.map((param) => `/${param}`).join('')
    fetch(
      `${baseUrl}${mutationFetch.url}${
        paramsRequest !== '' ? paramsRequest : ''
      }`,
      {
        body: JSON.stringify(body),
        method: mutationFetch.method,
        priority: 'auto',
        referrerPolicy: 'no-referrer',
        headers: headersRequest,
      }
    )
      .then((res) => {
        propertyFetch.current.isOk = res.ok
        propertyFetch.current.status = res.status
        propertyFetch.current.statusText = res.statusText
        return res.json()
      })
      .then((data) => {
        setData(data)
      })
      .catch(() => {
        const error = new ErrorRequest()
        setError(error.message)
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const abortRequest = () => {
    mutationFetch.controllerAbort.abort()
  }

  return {
    data,
    isError,
    error,
    isLoading,
    isOk: propertyFetch.current.isOk,
    status: propertyFetch.current.status,
    statusText: propertyFetch.current.statusText,
    abortRequest,
    mutation,
  }
}
