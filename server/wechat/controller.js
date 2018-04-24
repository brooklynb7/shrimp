'use strict'

import config from './config'
import wechat from 'co-wechat'
import API from 'co-wechat-api'
const api = new API(config.appId, config.appSecret)
const menuButton = config.menuButton

const MessageHandler = function (wechatUser, message, response) {
  this.wechatUser = wechatUser
  this.message = message
  this.res = response
}

MessageHandler.prototype.isSubscribeEvent = function () {
  var message = this.message
  if (message.MsgType === config.msgType.event &&
    message.Event === config.event.subscribe) {
    return true
  } else {
    return false
  }
}

MessageHandler.prototype.isScanEvent = function () {
  if (this.message.MsgType === config.msgType.event &&
    this.message.Event === config.event.scan) {
    return true
  } else {
    return false
  }
}

MessageHandler.prototype.isLocationEvent = function () {
  if (this.message.MsgType === config.msgType.location) {
    return true
  } else {
    return false
  }
}

MessageHandler.prototype.isNormalText = function () {
  if (this.message.MsgType === config.msgType.text) {
    return true
  } else {
    return false
  }
}

MessageHandler.prototype.isMenuClick = function () {
  if (this.message.MsgType === config.msgType.event &&
    this.message.Event === config.event.click) {
    return true
  } else {
    return false
  }
}

MessageHandler.prototype.handleSubscribeEvent = function () {
  return config.subscribeMsg
}

MessageHandler.prototype.handleMenuClick = function () {
  return ''
}

MessageHandler.prototype.handleNormalTextEvent = function () {
  return '测试'
}

MessageHandler.prototype.handleScanEvent = function () {
  return ''
}

MessageHandler.prototype.responseEmpty = function () {
  return ''
}

function handleMessage (handler) {
  let returnMsg = ''
  switch (true) {
    case handler.isSubscribeEvent():
      returnMsg = handler.handleSubscribeEvent()
      break
    case handler.isMenuClick():
      returnMsg = handler.handleMenuClick()
      break
    case handler.isNormalText():
      returnMsg = handler.handleNormalTextEvent()
      break
    default:
      returnMsg = handler.responseEmpty()
      break
  }
  return returnMsg
}

var handler = new MessageHandler()

const wechatMidConfig = {
  token: config.token,
  appid: config.appId,
  encodingAESKey: config.aseKey
}

const index = wechat(wechatMidConfig).middleware(async (message, ctx) => {
  handler.message = message
  return handleMessage(handler)
})

const createMenu = async (ctx) => {
  const rst = await api.createMenu({
    'button': [{
      'name': menuButton.menu1.name,
      'sub_button': [{
        'type': 'view',
        'name': menuButton.test.name,
        'url': menuButton.test.url
      }]
    }]
  })
  ctx.body = rst
}

const test = async (ctx) => {
  ctx.body = 'Wechat Api'
}

export default {
  index: index,
  test: test,
  createMenu: createMenu
}
