import { GET, route } from 'awilix-express'
import { Request, Response } from 'express'
import { TestService } from '../services/test.service'
import { BaseController } from './base.controller'

@route('/check')
export class CheckController extends BaseController {
  constructor (private readonly testService: TestService) {
    super()
  }

  @GET()
  public index (req: Request, res: Response): void {
    this.log.info('Estado de la aplicación')
    res.send({
      NODE_ENV: process.env.NODE_ENV,
      APP_ENV: process.env.APP_ENV
    })
  }

  @route('/date')
  @GET()
  public test (req: Request, res: Response): void {
    this.log.info('Obtener la fecha')
    res.send({
      date: this.testService.get()
    })
  }
}
