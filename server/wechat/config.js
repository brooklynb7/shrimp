'use strict'

import wechatConfig from './config.wechat'
import OAuth from 'wechat-oauth'
const client = new OAuth(wechatConfig.appId, wechatConfig.appSecret)

const createWechatOAuthUrl = function (cbUrlPath) {
  return client.getAuthorizeURL(
    wechatConfig.host +
    '/auth/wechat?cb=' +
    encodeURIComponent(wechatConfig.url + cbUrlPath),
    '1',
    'snsapi_userinfo'
  )
}

export default {
  host: wechatConfig.host,
  port: 3031,
  token: wechatConfig.token,
  appId: wechatConfig.appId,
  appSecret: wechatConfig.appSecret,
  aseKey: wechatConfig.aseKey,
  account: wechatConfig.account,
  msgType: {
    event: 'event',
    text: 'text',
    location: 'location'
  },
  event: {
    subscribe: 'subscribe',
    click: 'CLICK',
    view: 'VIEW',
    scan: 'SCAN'
  },
  mp_url: 'https://mp.weixin.qq.com/',
  mp_login_url: 'https://mp.weixin.qq.com/cgi-bin/login?lang=zh_CN',
  subscribeMsg: '感谢您的关注',
  menuButton: {
    menu1: {
      name: 'menu1'
    },
    menu2: {
      name: 'menu1'
    },
    menu3: {
      name: 'menu3'
    },
    test: {
      name: 'test',
      url: createWechatOAuthUrl('/test')
    }
  }
}
