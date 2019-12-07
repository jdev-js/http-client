import { useEffect } from 'react'
import { NAMES_EVENT } from './constans'

export default function useStart(callback) {
  useEffect(() => {
    window.addEventListener(NAMES_EVENT.REQUESTSTART, () => callback())
    return () => {
      window.removeEventListener(NAMES_EVENT.REQUESTSTART, () => callback())
    }
  }, [])
}
