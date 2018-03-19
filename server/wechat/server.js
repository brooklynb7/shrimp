'use strict'

import Koa from 'koa'
import chalk from 'chalk'
import moment from 'moment'
import parser from '../middlewares/parser'
import error from '../middlewares/error'
import logger from '../middlewares/logger'
import apiJson from '../middlewares/api-json'
import routes from './routes'
import config from './config'

const app = new Koa()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || config.port

parser(app)

logger(app)
apiJson(app)
routes(app)

error(app)

app.listen(port, host, () => {
  // Logging initialization
  console.log('--')
  console.log(chalk.green(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Wechat API Server started on port ${port}`))
  console.log('--')
})
