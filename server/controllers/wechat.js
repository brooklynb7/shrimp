'use strict'

import WechatService from '../services/wechat'
import PhotoService from '../services/photo'
import * as _ from 'lodash'

/* API Controller */
const getJsConfig = async (ctx) => {
  const jsConfig = await WechatService.getJsConfig({
    jsConfigUrl: ctx.query.url,
    jsApiList: ['scanQRCode', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData']
  })

  ctx.body = jsConfig
}

const retrieveWxImgs = async (ctx) => {
  const mediaIds = ctx.request.body.mediaIds
  const mediaIdArray = mediaIds.split(',')
  try {
    const retrievedWxImgs = await Promise.all(_.map(mediaIdArray, (id) => {
      return WechatService.getMedia(id)
    }))
    const retrievedWxImgsBuffer = _.filter(retrievedWxImgs, (wxImg) => {
      return Buffer.isBuffer(wxImg)
    })

    try {
      const rst = await Promise.all(_.map(retrievedWxImgsBuffer, async (wxImg, idx) => {
        const fileName = `${Date.now()}-${idx}.jpg`
        PhotoService.saveWxImgByBuffer({
          wxImg: wxImg,
          fileName: fileName,
          userId: ctx.state.user._id
        })

        return PhotoService.addPhoto({
          fileName: fileName,
          user: ctx.state.user._id
        })
      }))
      ctx.body = rst
    } catch (err) {
      console.log(err)
      ctx = 500
      ctx.body = err
    }
  } catch (err) {
    ctx.throw(500, err)
  }
}

export default {
  getJsConfig, retrieveWxImgs
}
