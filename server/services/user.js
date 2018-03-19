'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import userModel from '../models/user'

userModel.init()

const User = mongoose.model('User')

const queryUser = async () => {
  const rst = await Promise.all([User.count(), User.find()])
  return {
    count: rst[0],
    admins: rst[1]
  }
}

const findUserByUid = async (id) => {
  return User.findOne({
    _id: id
  }, '-salt -password')
}

const findLocalUserByUserName = async (username) => {
  return User.findOne({
    username: username,
    provider: 'local'
  })
}

export default {
  queryUser, findLocalUserByUserName, findUserByUid
}
