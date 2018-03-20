'use strict'

/**
 * Module dependencies.
 */
import passport from 'koa-passport'
import passportLocal from 'passport-local'
import UserService from '../services/user'
const LocalStrategy = passportLocal.Strategy

const init = () => {
  // Use local strategy
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    try {
      const user = await UserService.findLocalUserByUserName(username)
      if (!user) {
        return done(null, false, { message: '该用户不存在' })
      } else if (!user.authenticate(password)) {
        return done(null, false, { message: '用户名/密码不正确' })
      } else {
        return done(null, user)
      }
    } catch (err) {
      return done(err)
    }
  }))
}

export default {
  init
}
