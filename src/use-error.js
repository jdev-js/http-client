import { useEffect } from 'react'
import { EVENT } from './constans'

export default function useError(callback) {
  useEffect(() => {
    window.addEventListener(EVENT.REQUESTERROR, () => callback())
    return () => {
      window.removeEventListener(EVENT.REQUESTERROR, () => callback())
    }
  }, [])
}
