import { GET, route } from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from './base.controller'

@route('/')
export class DefaultController extends BaseController {
  @GET()
  public index (req: Request, res: Response): void {
    this.log.warn('Mensaje de bienvenida')
    res.send({
      running: 'Application is running!'
    })
  }
}
