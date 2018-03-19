'use strict'

import Router from 'koa-router'

const apiRouter = new Router({
  prefix: '/api/test'
})

export default app => {
  apiRouter.get('/', async ctx => {
    ctx.body = { test: 1 }
  })

  app.use(apiRouter.routes())
}
