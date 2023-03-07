import { asClass, createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import type express from 'express'
import { SubscriptionMySQLRepository } from './repositories/mysql/subscription.query'
import { SubscriptionService } from './services/subscription.service'
import { TestService } from './services/test.service'

export default (app: express.Application): void => {
  const container = createContainer({ injectionMode: 'CLASSIC' })

  container.register({
    // Repositories
    subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),

    // Services
    subscriptionService: asClass(SubscriptionService).scoped(),
    testService: asClass(TestService).scoped()
  })

  app.use(scopePerRequest(container))
}
