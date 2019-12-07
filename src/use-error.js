import { useEffect } from 'react'
import { NAMES_EVENT } from './constans'

export default function useError(callback) {
  useEffect(() => {
    window.addEventListener(NAMES_EVENT.REQUESTERROR, () => callback())
    return () => {
      window.removeEventListener(NAMES_EVENT.REQUESTERROR, () => callback())
    }
  }, [])
}
