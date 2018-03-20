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

const findOne = async (searchOptions) => {
  return User.findOne(searchOptions)
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

const findUniqueUsername = async (possibleUsername) => {
  return User.findUniqueUsername(possibleUsername, null)
}

const addUser = async (userOptions) => {
  const user = new User(userOptions)
  const createdUser = await user.save()
  return createdUser
}

export default {
  queryUser, findLocalUserByUserName, findUserByUid, findOne, findUniqueUsername, addUser
}
