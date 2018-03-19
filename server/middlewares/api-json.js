'use strict'

import mount from 'koa-mount'

const jsonMiddleware = async (ctx, next) => {
  ctx.type = 'json'
  await next()
}

export default app => {
  app.use(mount('/api', jsonMiddleware))
}
