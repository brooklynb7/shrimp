'use strict'

/**
 * Module dependencies.
 */
import passport from 'koa-passport'
import localStrategy from '../strategies/local'
import wechatStrategy from '../strategies/wechat'
import UserService from '../services/user'

const init = () => {
  // Serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  // Deserialize sessions
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserService.findUserByUid(id)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  localStrategy.init()
  wechatStrategy.init()
}

export default app => {
  init()
  app.use(passport.initialize())
  app.use(passport.session())
}
