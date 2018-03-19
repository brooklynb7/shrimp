'use strict'

import { Nuxt, Builder } from 'nuxt'

export default app => {
  // Import and Set Nuxt.js options
  let nuxtConfig = require('../../nuxt.config.js')
  nuxtConfig.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  // Build in development
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    builder.build().catch(e => {
      console.error(e) // eslint-disable-line no-console
      process.exit(1)
    })
  }

  // Hook Nuxt up!
  // https://github.com/nuxt-community/koa-template/blob/master/template/server/index.js
  app.use(async (ctx, next) => {
    if (ctx.path.indexOf('/api') !== 0) {
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    } else {
      await next()
    }
  })
}
