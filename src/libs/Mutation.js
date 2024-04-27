export default class Mutation{
    constructor(requestName,requestUrl,method){
        this.name = requestName
        this.url = requestUrl
        this.idCache = `${this.name}${Math.random().toString(36).slice(3,-1)}`
        this.controllerAbort = new AbortController()
        this.method = method
        this.signal = this.controllerAbort.signal
    }
}