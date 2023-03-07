import { DELETE, GET, POST, PUT, route } from 'awilix-express'
import { Request, Response } from 'express'
import { SubscriptionService } from '../services/subscription.service'
import { BaseController } from './base.controller'

@route('/subscriptions')
export class SubscriptionController extends BaseController {
  constructor (private readonly subscriptionService: SubscriptionService) {
    super()
  }

  @GET()
  public async all (req: Request, res: Response): Promise<void> {
    this.log.debug('Estamos en obteniendo todos los resultado')
    try {
      res.send(await this.subscriptionService.all())
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @route('/:id')
  @GET()
  public async find (req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id)
      const entity = await this.subscriptionService.find(id)
      if (entity != null) {
        res.send(entity)
      } else {
        res.status(404).send()
      }
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @POST()
  public async store (req: Request, res: Response): Promise<void> {
    try {
      const subscription: SubscriptionCreateDto = {
        user_id: req.body.user_id,
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron
      }
      await this.subscriptionService.store(subscription)
      res.send()
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @route('/:id')
  @PUT()
  public async update (req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id)
      const subscription: SubscriptionUpdateDto = {
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron
      }
      await this.subscriptionService.update(id, subscription)
      res.send()
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @route('/:id')
  @DELETE()
  public async remove (req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id)
      await this.subscriptionService.remove(id)
      res.send()
    } catch (error) {
      this.handleException(error, res)
    }
  }
}
