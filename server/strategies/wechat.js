'use strict'

/**
 * Module dependencies.
 */
import passport from 'koa-passport'
import WechatStrategy from 'passport-wechat'
import UserController from '../controllers/user'
import wechatConfig from '../wechat/config'

const init = () => {
  // Use local strategy
  passport.use(new WechatStrategy({
    appID: wechatConfig.appId,
    appSecret: wechatConfig.appSecret,
    scope: 'snsapi_userinfo',
    state: '1'
  }, async (accessToken, refreshToken, profile, expiresIn, done) => {
    // Set the provider data and include tokens
    const providerData = profile
    providerData.token = accessToken
    // Create the user OAuth profile
    var providerUserProfile = {
      displayName: profile.nickname,
      username: profile.openid,
      gender: profile.sex,
      avatar: profile.headimgurl,
      provider: 'wechat',
      providerIdentifierField: 'openid',
      providerData: providerData
    }

    // Save the user OAuth profile
    UserController.saveOAuthUserProfile(providerUserProfile, done)
  }))
}

export default {
  init
}
