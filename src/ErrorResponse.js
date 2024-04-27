export default class ErrorResponse extends Error {
  constructor() {
    super()
    this.name = 'ErrorResponse'
    this.message = 'Error at revice the response'
    this.stack = ''
  }
}
