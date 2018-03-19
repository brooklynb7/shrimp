'use strict'

import wechatConfig from './config.wechat'
import OAuth from 'wechat-oauth'
const client = new OAuth(wechatConfig.appId, wechatConfig.appSecret)

const createWechatOAuthUrl = function (cbUrlPath) {
  return client.getAuthorizeURL(wechatConfig.host + '/auth/wechat?cb=' +
    encodeURIComponent(wechatConfig.url + cbUrlPath), '1', 'snsapi_userinfo')
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
      name: '我是家属'
    },
    menu2: {
      name: '我是医生'
    },
    menu3: {
      name: '微医院'
    },
    luntan: {
      name: '医学论团',
      url: 'http://www.anxinyi.cn'
    },
    jiuzhen: {
      name: '预约就诊',
      url: 'http://www.anxinyi.cn/wechat-hospital/#/tab/jiuzhen'
    },
    wode: {
      name: '我的信息',
      url: 'http://www.anxinyi.cn/wechat-hospital/#/tab/wode'
    },
    zhuye: {
      name: '微主页',
      url: 'http://www.anxinyi.cn/wechat-hospital/#/tab/zhuye'
    },
    doctorMe: {
      name: '个人信息',
      url: 'http://www.anxinyi.cn/axy/doctor'
    },
    familyMe: {
      name: '个人信息',
      url: 'http://www.anxinyi.cn/axy/family'
    },
    scanQR: {
      name: '扫一扫',
      url: createWechatOAuthUrl('/scanqrcode')
    }
  }
}
