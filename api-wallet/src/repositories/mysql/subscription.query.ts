import conector from '../../configurations/persistence/mysql.persistence'
import { type Subscription } from '../../domains/subscription.domain'
import { type SubscriptionRepository } from '../subscription.repository'

export class SubscriptionMySQLRepository implements SubscriptionRepository {
  private readonly table = 'wallet_subscription'

  public async all (): Promise<Subscription[]> {
    const [rows] = await conector.execute(
      `SELECT * FROM ${this.table} ORDER BY id DESC`
    )
    return rows as Subscription[]
  }

  public async find (id: number): Promise<Subscription | null> {
    const [rows]: any[] = await conector.execute(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id])
    if (rows.length === 0) {
      return null
    }
    return rows[0] as Subscription
  }

  public async findByUserIdAndCode (userId: number, code: string): Promise<Subscription | null> {
    const [rows]: any[] = await conector.execute(
      `SELECT * FROM ${this.table} WHERE user_id = ? AND code = ?`,
      [userId, code])
    if (rows.length === 0) {
      return null
    }
    return rows[0] as Subscription
  }

  public async store (entry: Subscription): Promise<void> {
    await conector.execute(
      `INSERT INTO ${this.table}(user_id, code, amount, cron) VALUES(?,?,?,?)`,
      [entry.user_id, entry.code, entry.amount, entry.cron])
  }

  public async update (entry: Subscription): Promise<void> {
    await conector.execute(
      `UPDATE ${this.table} SET user_id = ?, code = ?, amount = ?, cron = ? WHERE id = ?`,
      [entry.user_id, entry.code, entry.amount, entry.cron, entry.id])
  }

  public async remove (id: number): Promise<void> {
    await conector.execute(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id])
  }
}
