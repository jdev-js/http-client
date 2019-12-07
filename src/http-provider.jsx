import { useRef, useState } from 'react'
import { httpContext } from './http-context'
import { EVENT } from './constans'

/**
 * @typedef {Object} URL
 * @property {string} name
 * @property {string} url
 * @property {string} method
 */

/**
 * @param {{children: React.ReactNode,config: { listURL: Array<URL>,baseURL: string} }} param0
 * @returns
 */

// eslint-disable-next-line react/prop-types
export default function HttpProvider({ children, config: configDefault }) {
  const headers = useRef({}) // -> para evitar el refrecos de la aplicacion antes de la peticion
  const [config, setConfig] = useState({ ...configDefault })

  const changeConfig = (callback) => {
    callback(config, setConfig)
    const newEvent = new Event(EVENT.CONFIGCHANGE)
    window.dispatchEvent(newEvent)
  }

  return (
    <httpContext.Provider value={{ config, headers, changeConfig }}>
      {children}
    </httpContext.Provider>
  )
}
