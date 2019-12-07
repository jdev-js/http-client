import { useEffect } from 'react'
import { EVENT } from './constans'

export default function useEnd(callback) {
  useEffect(() => {
    window.addEventListener(EVENT.REQUESTEND, () => callback())
    return () => {
      window.removeEventListener(EVENT.REQUESTEND, () => callback())
    }
  }, [])
}
