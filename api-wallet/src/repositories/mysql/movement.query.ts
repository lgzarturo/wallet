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

  public async store (entry: Movement): Promise<void> {
    await conector.execute(
      `INSERT INTO ${this.table}(user_id, movement_type, amount) VALUES(?,?,?,?)`,
      [entry.user_id, entry.movement_type, entry.amount])
  }

  public async update (entry: Movement): Promise<void> {
    await conector.execute(
      `UPDATE ${this.table} SET user_id = ?, movement_type = ?, amount = ? WHERE id = ?`,
      [entry.user_id, entry.movement_type, entry.amount, entry.id])
  }

  public async remove (id: number): Promise<void> {
    await conector.execute(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id])
  }
}
