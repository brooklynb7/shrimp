'use strict'

import mount from 'koa-mount'
import Router from 'koa-router'
import wechatApi from './controller'

const apiRouter = new Router({
  prefix: '/api/wechat'
})

export default app => {
  apiRouter.get('/createMenu', wechatApi.createMenu)
  apiRouter.get('/test', wechatApi.test)
  app.use(apiRouter.routes())
  app.use(mount('/api/wechat', wechatApi.index))
}
