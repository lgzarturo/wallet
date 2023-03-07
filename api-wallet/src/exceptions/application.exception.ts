export class ApplicationException extends Error {
  constructor (message = 'Se ha suscitado un error inesperado') {
    super(message)
  }
}
