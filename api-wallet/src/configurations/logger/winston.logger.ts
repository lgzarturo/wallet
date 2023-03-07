import winston from 'winston'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = (): string => {
  const env = process.env.NODE_ENV ?? 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

interface Message {
  timestamp: number
  level: string
  message: any
  stack?: string
}

const formatText = (info: Message): string => {
  let message: string & { _message?: '' } = info.message
  if (typeof info.message === 'object') {
    message = JSON.stringify(info.message)
  }
  const timestamp: number & { _timestamp?: 0 } = info.timestamp
  let response = `${timestamp} ${info.level}: ${message}`
  if (info.stack !== undefined) {
    response += `\nStackTrace:\n${info.stack}`
  }
  return response
}

const formatColor = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => formatText(info as Message))
)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => formatText(info as Message))
)

const transports = [
  new winston.transports.Console({ format: formatColor }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({
    filename: 'logs/all.log'
  })
]

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
})

export default Logger
