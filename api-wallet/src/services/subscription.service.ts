import { type Subscription } from '../domains/subscription.domain'
import { ApplicationException } from '../exceptions/application.exception'
import { type SubscriptionRepository } from '../repositories/subscription.repository'

export class SubscriptionService {
  constructor (private readonly subscriptionRepository: SubscriptionRepository) { }

  public async all (): Promise<Subscription[]> {
    return await this.subscriptionRepository.all()
  }

  public async find (id: number): Promise<Subscription | null> {
    return await this.subscriptionRepository.find(id)
  }

  public async store (entry: SubscriptionCreateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.findByUserIdAndCode(entry.user_id, entry.code)
    if (originalEntry == null) {
      await this.subscriptionRepository.store(entry as Subscription)
    } else {
      throw new ApplicationException('La suscripción del usuario ya ha sido registrada.')
    }
  }

  public async update (id: number, entry: SubscriptionUpdateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.find(id)
    if (originalEntry != null) {
      if (originalEntry.code !== entry.code) {
        const existsEntry = await this.subscriptionRepository.findByUserIdAndCode(originalEntry.user_id, entry.code)
        if (existsEntry != null) {
          throw new ApplicationException(`La suscripción con el código '${entry.code}' del usuario ya ha sido registrada.`)
        }
        originalEntry.code = entry.code
      }
      originalEntry.amount = entry.amount
      originalEntry.cron = entry.cron
      await this.subscriptionRepository.update(originalEntry)
    } else {
      throw new ApplicationException('La suscripción no ha sido encontrada.')
    }
  }

  public async remove (id: number): Promise<void> {
    await this.subscriptionRepository.remove(id)
  }
}
