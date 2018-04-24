'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'
import DeepPopulate from 'mongoose-deep-populate'
const deepPopulate = DeepPopulate(mongoose)

const Schema = mongoose.Schema

/**
 * Feedback Schema
 */
const FeedbackSchema = new Schema({
  issueType: {
    type: Number,
    default: 1
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  detail: {
    type: String,
    default: ''
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

FeedbackSchema.plugin(deepPopulate, {
  populate: {
    user: {
      select: 'name username realName teacherName parentName'
    }
  }
})

export default {
  init: () => {
    mongoose.model('Feedback', FeedbackSchema)
  }
}
