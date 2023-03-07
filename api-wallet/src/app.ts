/* eslint-disable import/first */
import dotenv from 'dotenv'
import path from 'path'

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'
process.env.APP_ENV = process.env.APP_ENV ?? 'development'

dotenv.config({
  path: path.join(__dirname, '..', 'config', `${process.env.APP_ENV}.env`)
})

import { loadControllers } from 'awilix-express'
import express from 'express'
import loadContainer from './container'
import morganMiddleware from './middleware/morgan.middleware'

const app: express.Application = express()

app.use(morganMiddleware)

app.use(express.json())

loadContainer(app)

app.use(loadControllers('controllers/*.ts', { cwd: __dirname }))

export { app }
