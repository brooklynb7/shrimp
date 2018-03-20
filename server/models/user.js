'use strict'

/**
 * Module dependencies.
 */
import mongoose from 'mongoose'
import util from '../utils'
import crypto from 'crypto'

const Schema = mongoose.Schema

/**
 * A Validation function for local strategy properties
 */
// const validateLocalStrategyProperty = function (property) {
//   return ((this.provider !== 'local' && !this.updated) || property.length)
// };

/**
 * A Validation function for local strategy password
 */
const validateLocalStrategyPassword = function (password) {
  return (this.provider !== 'local' || util.isValidPassword(password))
}

/**
 * User Schema
 */
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: '请填写用户名',
    trim: true
  },
  password: {
    type: String,
    required: '请填写密码',
    validate: [validateLocalStrategyPassword, '密码长度至少6位']
  },
  avatar: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    default: 1
  },
  salt: {
    type: String
  },
  name: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    default: ''
  },
  mobile: {
    type: String,
    default: '',
    trim: true
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  realName: {
    type: String,
    default: '',
    trim: true
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {

  },
  additionalProvidersData: {

  },
  created: {
    type: Date,
    default: Date.now
  }
})

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  if (util.isValidPassword(this.password)) {
    this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64')
    this.password = this.hashPassword(this.password)
  }

  next()
})

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, null).toString('base64')
  } else {
    return password
  }
}

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password)
}

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = async function (username, suffix) {
  const _this = this
  const possibleUsername = username + (suffix || '')

  const foundUser = await _this.findOne({
    username: possibleUsername
  })

  if (!foundUser) {
    return possibleUsername
  } else {
    return _this.findUniqueUsername(username, (suffix || 0) + 1)
  }
}

export default {
  init: () => {
    mongoose.model('User', UserSchema)
  }
}
