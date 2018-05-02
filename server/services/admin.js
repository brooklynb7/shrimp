'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import adminModel from '../models/admin'

adminModel.init()

const Admin = mongoose.model('Admin')

const queryAdmin = async () => {
  const rst = await Promise.all([Admin.count(), Admin.find()])
  return {
    count: rst[0],
    admins: rst[1]
  }
}

const addAdmin = async (adminData) => {
  const admin = new Admin({
    name: adminData.name,
    password: adminData.password,
    memo: adminData.memo
  })
  return admin.save()
}

const findAdmin = async (query) => {
  return Admin.find(query).select('-password').exec()
}

export default {
  queryAdmin, addAdmin, findAdmin
}
