import { httpContext } from './http-context'
import { useContext } from 'react'

export default function useClient(){
    return useContext(httpContext)
} 