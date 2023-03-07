import { type Response } from 'express'
import Logger from '../configurations/logger/winston.logger'
import { ApplicationException } from '../exceptions/application.exception'

export abstract class BaseController {
  log = Logger

  handleException (err: unknown, res: Response): void {
    let errorStack = {}
    if (err instanceof Error) {
      errorStack = {
        stack: err.stack,
        message: err.message
      }
    }
    this.log.error(errorStack)
    if (err instanceof ApplicationException) {
      this.log.debug(err.message)
      res.status(400).send({
        message: err.message
      })
    } else {
      res.status(500).send()
    }
  }
}
