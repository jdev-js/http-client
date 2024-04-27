export default class ErrorRequest extends Error {
  constructor() {
    super()
    this.stack = ''
    this.name = 'ErrorRequest'
    this.message = 'Error at send request'
  }
}
