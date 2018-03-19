'use strict'

import serve from 'koa-static'
import mount from 'koa-mount'
import compress from 'koa-compress'

export default app => {
  app.use(compress({
    filter: (contentType) => {
      // console.log(contentType)
      return /json|text|javascript|css/i.test(contentType)
    }
  }))

  app.use(mount('/static', serve('./static')))
}
