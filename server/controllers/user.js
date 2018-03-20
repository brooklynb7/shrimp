'use strict'

import passport from 'koa-passport'
import UserService from '../services/user'

/* API Controller */
const addDefaultUser = async (ctx) => {
  // https://vuetifyjs.com/static/doc-images/logo.svg
  try {
    const user = await UserService.addUser({
      username: 'test',
      password: '123456',
      gender: 2,
      avatar: 'https://vuetifyjs.com/static/doc-images/logo.svg',
      name: 'Michael Jordan',
      email: 'test@163.com',
      provider: 'local'
    })
    ctx.body = user
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
}

/* Auth Controller */

const login = async (ctx) => {
  return passport.authenticate('local', {
    badRequestMessage: '请输入用户名和密码'
  }, function (err, user, info) {
    if (err) {
      return ctx.throw(err)
    } else if (!user) {
      ctx.body = info
      ctx.status = 401
    } else {
      ctx.body = user
      return ctx.login(user)
    }
  })(ctx)
}

const signinWechat = async (ctx) => {
  return passport.authenticate('wechat', async (err, user) => {
    if (err) {
      return ctx.throw(err)
    }
    if (ctx.query.cb) {
      ctx.redirect(ctx.query.cb)
    } else {
      ctx.body = 'No callback url'
    }

    return ctx.login(user)
  })(ctx)
}

/**
* Helper function to save or update a OAuth user profile
*/
const saveOAuthUserProfile = async (providerUserProfile, done) => {
  // Define a search query fields
  var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField
  var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' +
    providerUserProfile.providerIdentifierField

  // Define main provider search query
  var mainProviderSearchQuery = {}
  mainProviderSearchQuery.provider = providerUserProfile.provider
  mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField]

  // Define additional provider search query
  var additionalProviderSearchQuery = {}
  additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] =
    providerUserProfile.providerData[providerUserProfile.providerIdentifierField]

  // Define a search query to find existing user with current provider profile
  var searchQuery = {
    $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
  }

  try {
    let foundUser = await UserService.findOne(searchQuery)
    if (!foundUser) {
      const possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '')

      const availableUsername = await UserService.findUniqueUsername(possibleUsername)

      foundUser = {
        username: availableUsername,
        password: 'Welcome1!',
        gender: providerUserProfile.gender,
        avatar: providerUserProfile.avatar,
        name: providerUserProfile.displayName,
        email: providerUserProfile.email,
        provider: providerUserProfile.provider,
        providerData: providerUserProfile.providerData
      }
      const createdUser = await UserService.addUser(foundUser)
      return done(null, createdUser)
    } else {
      return done(null, foundUser)
    }
  } catch (err) {
    return done(err)
  }
}

/*
 * API controllers
 */

export default {
  saveOAuthUserProfile, signinWechat, login, addDefaultUser
}
