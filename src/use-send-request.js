import { useEffect, useState } from 'react'
import { EVENT } from './constans'

export default function useSendRequest(functionRequest, params, timeUpdate) {
  const [isSend, setIsSend] = useState(false)

  useEffect(() => {
    let interval
    if (timeUpdate === undefined || timeUpdate === null) {
      functionRequest(params)
      setIsSend(true)
      const newEventRequestStart = new Event(EVENT.REQUESTSTART)
      window.dispatchEvent(newEventRequestStart)
    } else if (timeUpdate > 0) {
      setIsSend(true)
      interval = window.setInterval(() => functionRequest(params), timeUpdate)
    }

    return () => clearInterval(interval)
  }, [timeUpdate, params])

  return isSend
}
