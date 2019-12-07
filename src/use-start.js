import { useEffect } from 'react'
import { EVENT } from './constans'

export default function useStart(callback) {
  useEffect(() => {
    window.addEventListener(EVENT.REQUESTSTART, () => callback())
    return () => {
      window.removeEventListener(EVENT.REQUESTSTART, () => callback())
    }
  }, [])
}
