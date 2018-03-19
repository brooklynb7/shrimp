'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'
import util from '../utils'

const Schema = mongoose.Schema

/**
 * Admin Schema
 */
const AdminSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: '请填写密码',
    validate: [util.isValidPassword, '密码长度至少6位']
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

/**
 * Hook a pre save method to hash the password
 */
AdminSchema.pre('save', function (next) {
  if (util.isValidPassword(this.password)) {
    this.password = util.md5(this.password)
  }
  next()
})

export default {
  init: () => {
    mongoose.model('Admin', AdminSchema)
  }
}
