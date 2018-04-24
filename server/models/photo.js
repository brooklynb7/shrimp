'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'
import DeepPopulate from 'mongoose-deep-populate'
const deepPopulate = DeepPopulate(mongoose)

const Schema = mongoose.Schema

/**
 * Photo Schema
 */
const PhotoSchema = new Schema({
  fileName: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  memo: {
    type: String,
    default: ''
  },
  createTime: {
    type: Number,
    default: Date.now
  }
})

PhotoSchema.plugin(deepPopulate, {
  populate: {

  }
})

export default {
  init: () => {
    mongoose.model('Photo', PhotoSchema)
  }
}
