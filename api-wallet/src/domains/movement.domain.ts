import { type MovementType } from '../enums/movement_type'

export interface Movement {
  id: number
  user_id: number
  movement_type: MovementType
  amount: number
  created_at: Date | null
  updated_at: Date | null
}
