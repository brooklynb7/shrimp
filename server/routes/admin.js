'use strict'

import Router from 'koa-router'
import admin from '../controllers/admin'

const apiRouter = new Router({
  prefix: '/api/admins'
})

export default app => {
  apiRouter.get('/', admin.queryAdmin)
  apiRouter.get('/default/add', admin.addDefaultAdmin)

  app.use(apiRouter.routes())
}
