import { app } from './app'
import Logger from './configurations/logger/winston.logger'

const PORT = process.env.PORT ?? 5000
const log = Logger

app.listen(PORT, () => {
  log.info(19919010)
  log.info(`Application running on port ${PORT}`)
})
