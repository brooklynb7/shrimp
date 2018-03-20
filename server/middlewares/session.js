'use strict'

import MongooseStore from 'koa-session-mongoose'
import session from 'koa-session'
import config from '../config'

export default (app, connection) => {
  app.keys = [config.session.secretKey]
  app.use(session({
    store: new MongooseStore({
      connection: connection
    })
  }, app))
}
