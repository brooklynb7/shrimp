'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import photoModel from '../models/photo'
import sharp from 'sharp'
import fs from 'fs-extra'
import path from 'path'
import base from './base'

photoModel.init()

const Photo = mongoose.model('Photo')

const addPhoto = async (photoData) => {
  const photo = new Photo({
    fileName: photoData.fileName,
    user: photoData.user
  })
  await photo.save()
  return photo
}

const saveWxImgByBuffer = async ({ wxImg, fileName, userId }) => {
  const filePath = path.resolve(`./static/photos/${userId}/${fileName}`)
  const smallFilePath = path.resolve(`./static/photos/${userId}/small/${fileName}`)
  const image = sharp(wxImg)
  const smallWxImg = await image.resize(640).toFormat('jpg').toBuffer()
  return Promise.all([fs.outputFile(smallFilePath, smallWxImg), fs.outputFile(filePath, wxImg)])
}

const queryPhoto = async ({ query, sort }) => {
  return base.queryEntryList({
    entry: Photo,
    query: query,
    sort: sort
  })
}

export default {
  addPhoto, queryPhoto, saveWxImgByBuffer
}
