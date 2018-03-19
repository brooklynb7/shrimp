'use strict'

const pageNotFound = (ctx) => {
  ctx.status = 404
  switch (ctx.type) {
    case 'application/json':
      ctx.body = {
        message: 'API Not Found'
      }
      break
    default:
      ctx.type = 'text'
      ctx.body = 'Page Not Found'
  }
}

const internalError = async ctx => {
  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  ctx.status = 500
  switch (ctx.type) {
    case 'application/json':
      ctx.body = {
        message: 'Internal Error'
      }
      break
    default:
      ctx.type = 'text'
      ctx.body = 'Internal Error'
  }
}

const error = async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) {
      pageNotFound(ctx)
    }
  } catch (err) {
    internalError(ctx)
    ctx.app.emit('error', err, ctx)
  }
}

export default (app) => {
  // Catch and format the error in the upstream.
  // https://github.com/koajs/koa/wiki/Error-Handling
  app.use(error)
}
