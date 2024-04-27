import { useState } from 'react'
import Query from './Query'
import Mutation from './Mutation'
import { httpContext } from './http-context'

/**
 * @typedef {Object} URL
 * @property {string} name
 * @property {string} url
 * @property {string} method
 */

/**
 * @param {{children: React.ReactNode,baseUrl:string,querys: Array<URL>,mutations: Array<URL>}} param0 
 * @returns 
 */
// eslint-disable-next-line react/prop-types
export default function HttpProvider({children,baseUrl="",headers={},querys = [],mutations = []}){
    const [token,setToken] = useState(null)
    const [auth,setAuth] = useState(null)

    const headersRequest = {
        ...headers,
        authorization: token,
        "Content-Type": "application/json"
    }
    const querysList = querys.map(query => new Query(query.name,query.url))
    const mutationsList  = mutations.map(mutation => new Mutation(mutation.name,mutation.url,mutation.method))
    return(
        <httpContext.Provider value={{querysList,mutationsList,baseUrl,headersRequest,token,setToken,setAuth,auth}}>
            {children}
        </httpContext.Provider>
    )
} 
