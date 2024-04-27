export default class Query{
    constructor(requestName,requestUrl){
        this.name = requestName
        this.url = requestUrl
        this.idCache = `${this.name}${Math.random().toString(36).slice(3,-1)}`
        this.controllerAbort = new AbortController()
        this.signal = this.controllerAbort.signal
    }
}