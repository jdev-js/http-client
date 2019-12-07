import { useEffect } from 'react'
import { NAMES_EVENT } from './constans'

export default function useEnd(callback) {
  useEffect(() => {
    window.addEventListener(NAMES_EVENT.REQUESTEND, () => callback())
    return () => {
      window.removeEventListener(NAMES_EVENT.REQUESTEND, () => callback())
    }
  }, [])
}
