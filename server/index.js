'use strict'

import Koa from 'koa'
import config from './config'
import middlewares from './middlewares'
import chalk from 'chalk'
import moment from 'moment'
import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const init = async () => {
  const connection = await mongoose.connect(config.db.uri, config.db.options)
  console.log('--')
  console.log(chalk.green(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] DB connected`))
  console.log('--')

  const app = new Koa()
  const host = process.env.HOST || '0.0.0.0'
  const port = process.env.PORT || config.server.port

  // Middlewares are imported here.
  middlewares(app, connection)

  app.listen(port, host, () => {
    // Logging initialization
    console.log('--')
    console.log(chalk.green(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Server started on port ${port}`))
    console.log('--')
  })
}

init()
