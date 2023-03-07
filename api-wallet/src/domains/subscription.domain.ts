export interface Subscription {
  id: number
  user_id: number
  code: string
  amount: number
  cron: string
  created_at: Date | null
  updated_at: Date | null
}
