'use strict'

import AdminService from '../services/admin'

/*
 * API controllers
 */

const queryAdmin = async (ctx) => {
  try {
    const admins = await AdminService.queryAdmin()
    ctx.body = admins
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
}

const addDefaultAdmin = async (ctx) => {
  try {
    const admin = await AdminService.addAdmin({
      name: 'admin',
      password: '123456'
    })
    ctx.body = admin
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
}

export default {
  queryAdmin, addDefaultAdmin
}
