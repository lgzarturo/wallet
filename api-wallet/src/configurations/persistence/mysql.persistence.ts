import { createPool } from 'mysql2/promise'
import Logger from '../logger/winston.logger'

const databaseConfiguration = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  decimalNumbers: true
}

Logger.info({ databaseConfiguration })

export default createPool(databaseConfiguration)
