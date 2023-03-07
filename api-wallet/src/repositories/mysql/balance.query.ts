import conector from '../../configurations/persistence/mysql.persistence'
import { type Balance } from '../../domains/balance.domain'
import { type BalanceRepository } from '../balance.repository'

export class BalanceMySQLRepository implements BalanceRepository {
  private readonly table = 'wallet_balance'

  public async all (): Promise<Balance[]> {
    const [rows] = await conector.execute(
      `SELECT * FROM ${this.table} ORDER BY id DESC`
    )
    return rows as Balance[]
  }

  public async find (id: number): Promise<Balance | null> {
    const [rows]: any[] = await conector.execute(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id])
    if (rows.length === 0) {
      return null
    }
    return rows[0] as Balance
  }

  public async findByUserId (userId: number): Promise<Balance | null> {
    const [rows]: any[] = await conector.execute(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [userId])
    if (rows.length === 0) {
      return null
    }
    return rows[0] as Balance
  }

  public async store (entry: Balance): Promise<void> {}
  public async update (entry: Balance): Promise<void> {}
  public async remove (id: number): Promise<void> {}
}
