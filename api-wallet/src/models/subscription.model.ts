/* eslint-disable @typescript-eslint/no-unused-vars */
interface SubscriptionCreateDto {
  user_id: number
  code: string
  amount: number
  cron: string
}

interface SubscriptionUpdateDto {
  code: string
  amount: number
  cron: string
}
