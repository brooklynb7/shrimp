'use strict'

import Router from 'koa-router'
import FeedbackController from '../controllers/feedback'
import AuthController from '../controllers/authentication'
import nuxtConfig from '../../nuxt.config'

const apiRouter = new Router({
  prefix: `${nuxtConfig.router.base}api/feedbacks`
})

export default app => {
  apiRouter.post('/', AuthController.requireAuthApi, FeedbackController.addFeedback)
  apiRouter.get('/', AuthController.requireAdminAuthApi, FeedbackController.getFeedbacks)
  apiRouter.get('/mine', AuthController.requireAuthApi, FeedbackController.getMyFeedbacks)

  app.use(apiRouter.routes())
}
