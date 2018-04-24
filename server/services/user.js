'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import userModel from '../models/user'
import base from './base'

userModel.init()

const User = mongoose.model('User')

// User parts
const queryUser = async ({ query, sort, deepPopulate }) => {
  return base.queryEntryList({
    entry: User,
    query: query,
    select: '-salt -password',
    deepPopulate: deepPopulate || 'parentBanji,teacherBanjis',
    sort: sort
  })
}

const findOne = async searchOptions => {
  return User.findOne(searchOptions)
    .select('-salt -password')
    .deepPopulate('parentBanji,teacherBanjis')
}

const findUserByUid = async id => {
  return User.findOne({
    _id: id
  })
    .select('-salt -password')
    .deepPopulate('parentBanji,teacherBanjis')
}

const findLocalUserByUserName = async username => {
  return User.findOne({
    username: username,
    provider: 'local'
  }).deepPopulate('parentBanji,teacherBanjis')
}

const findUniqueUsername = async possibleUsername => {
  return User.findUniqueUsername(possibleUsername, null)
}

const addUser = async userOptions => {
  const user = new User(userOptions)
  const createdUser = await user.save()
  return createdUser
}

const updateUserPwd = async () => {
  const user = await User.findOne({ username: 'test2' })
  user.password = '123456'
  return user.save()
}

const removeUser = async id => {
  return User.remove({
    _id: id
  })
}

const updateUserIsAdmin = async ({ id, isAdmin }) => {
  return User.findOneAndUpdate(
    {
      _id: id
    },
    { isAdmin: !!isAdmin }
  )
}

export default {
  addUser,
  queryUser,
  findLocalUserByUserName,
  findUserByUid,
  findOne,
  findUniqueUsername,
  updateUserIsAdmin,
  updateUserPwd,
  removeUser
}
