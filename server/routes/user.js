'use strict'

import Router from 'koa-router'
import UserController from '../controllers/user'
import AdminController from '../controllers/admin'
import AuthController from '../controllers/authentication'
import nuxtConfig from '../../nuxt.config'

const meApiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/me`
})

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/users`
})

const authRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/auth`
})

export default app => {
  meApiRouter.get('/photos', AuthController.requireAuthApi, UserController.getMyPhotos)

  apiRouter.get('/default/add', UserController.addDefaultUser)
  apiRouter.get('/', AuthController.requireAdminAuthApi, UserController.queryUsers)
  apiRouter.put('/:id/isadmin', AuthController.requireAdminAuthApi, UserController.updateUserIsAdmin)
  apiRouter.delete('/:id', AuthController.requireAdminAuthApi, UserController.removeUser)

  authRouter.get('/wechat', UserController.signinWechat)
  authRouter.post('/login', UserController.login)
  authRouter.post('/loginAdmin', AdminController.login)

  app.use(meApiRouter.routes())
  app.use(apiRouter.routes())
  app.use(authRouter.routes())
}
