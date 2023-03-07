import { type Subscription } from '../domains/subscription.domain'

export interface SubscriptionRepository {
  all: () => Promise<Subscription[]>
  find: (id: number) => Promise<Subscription | null>
  findByUserIdAndCode: (userId: number, code: string) => Promise<Subscription | null>
  store: (entry: Subscription) => Promise<void>
  update: (entry: Subscription) => Promise<void>
  remove: (id: number) => Promise<void>
}
