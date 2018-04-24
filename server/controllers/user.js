'use strict'

import passport from 'koa-passport'
import UserService from '../services/user'
import PhotoService from '../services/photo'

/* API Controller */
const addDefaultUser = async (ctx) => {
  // https://vuetifyjs.com/static/doc-images/logo.svg
  // const user = await UserService.addUser({
  //   username: 'test2',
  //   password: '123456',
  //   gender: 1,
  //   avatar: 'https://vuetifyjs.com/static/doc-images/logo.svg',
  //   name: 'David Beckham',
  //   email: 'test@163.com',
  //   provider: 'local'
  // })
  const user = await UserService.updateUserPwd()
  ctx.body = user
}

const queryUsers = async (ctx) => {
  const rst = await UserService.queryUser({
    query: {}, sort: '-created'
  })
  ctx.body = rst
}

const updateUserIsAdmin = async (ctx) => {
  const userId = ctx.params.id
  const isAdmin = ctx.request.body.isAdmin
  await UserService.updateUserIsAdmin({
    id: userId,
    isAdmin: isAdmin
  })
  ctx.body = 'ok'
}

const removeUser = async (ctx) => {
  try {
    const userId = ctx.params.id
    await UserService.removeUser(userId)
    ctx.body = 'ok'
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
  }
}

/* Me API Controller */
const getMyPhotos = async (ctx) => {
  const photos = await PhotoService.queryPhoto({
    query: {
      user: ctx.state.user._id.toString()
    },
    sort: '-createTime'
  })
  ctx.body = photos
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
      foundUser.name = providerUserProfile.displayName
      foundUser.avatar = providerUserProfile.avatar
      foundUser.providerData = providerUserProfile.providerData
      await foundUser.save()
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
  login,
  signinWechat,
  saveOAuthUserProfile,
  addDefaultUser,
  queryUsers,
  getMyPhotos,
  updateUserIsAdmin,
  removeUser
}
