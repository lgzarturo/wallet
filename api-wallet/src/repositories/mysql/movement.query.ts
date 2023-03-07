import conector from '../../configurations/persistence/mysql.persistence'
import { type Movement } from '../../domains/movement.domain'
import { type MovementRepository } from '../movement.repository'

export class MovementMySQLRepository implements MovementRepository {
  private readonly table = 'wallet_movement'

  public async all (): Promise<Movement[]> {
    const [rows] = await conector.execute(
      `SELECT * FROM ${this.table} ORDER BY id DESC`
    )
    return rows as Movement[]
  }

  public async find (id: number): Promise<Movement | null> {
    const [rows]: any[] = await conector.execute(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id])
    if (rows.length === 0) {
      return null
    }
    return rows[0] as Movement
  }

  public async store (entry: Movement): Promise<void> {}
  public async update (entry: Movement): Promise<void> {}
  public async remove (id: number): Promise<void> {}
}
