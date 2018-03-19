'use strict'

import logger from 'koa-logger'
import moment from 'moment'

export default app => {
  app.use(logger((str, args) => {
    const method = args[1]
    const apiPath = args[2]
    const status = args[3]
    const time = args[4]
    const size = args[5]
    const logTime = moment().format('YYYY-MM-DD HH:mm:ss')
    if (status !== undefined) {
      console.log(`[${logTime}] ${method} ${status} ${apiPath} ${time} ${size}`)
    } else {
      console.log(str)
    }
  }))
}
