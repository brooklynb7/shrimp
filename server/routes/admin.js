'use strict'

import Router from 'koa-router'
import admin from '../controllers/admin'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/admins`
})

export default app => {
  apiRouter.get('/', admin.queryAdmin)
  apiRouter.get('/default/add', admin.addDefaultAdmin)

  app.use(apiRouter.routes())
}
