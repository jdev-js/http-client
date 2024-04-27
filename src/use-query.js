import { useEffect, useRef, useState } from 'react'
import useClient from './use-client'
import ErrorRequest from './ErrorRequest'

/**
 *
 * @param {string} nameQuery
 * @param {Array<string>} params
 */
export default function useQuery(nameQuery, params = []) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(true)
  const [isError, setIsError] = useState(false)
  const propertyFetch = useRef({})

  const { baseUrl, querysList: querys, headersRequest } = useClient()
  const queryFetch = querys.filter(
    (query) => query.name.toLowerCase() === nameQuery.toLowerCase()
  )[0]

  useEffect(() => {
    const paramsRequest = params.map((param) => `/${param}`).join('')
    fetch(
      `${baseUrl}${queryFetch.url}${paramsRequest !== '' ? paramsRequest : ''}`,
      {
        method: 'GET',
        signal: queryFetch.signal,
        priority: 'high',
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
        setData({ [`${nameQuery}`]: data })
      })
      .catch(() => {
        const error = new ErrorRequest()
        setError(error)
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const abortRequest = () => {
    queryFetch.controllerAbort.abort()
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
  }
}
