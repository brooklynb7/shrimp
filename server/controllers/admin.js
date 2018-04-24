'use strict'

import AdminService from '../services/admin'
import util from '../utils'

/*
 * API Controller
 */

const queryAdmin = async (ctx) => {
  const admins = await AdminService.queryAdmin()
  ctx.body = admins
}

const addDefaultAdmin = async (ctx) => {
  const admin = await AdminService.addAdmin({
    name: 'admin',
    password: '123456'
  })
  ctx.body = admin
}

/* Auth Controller */
const login = async (ctx) => {
  const name = ctx.request.body.username
  const password = util.md5(ctx.request.body.password)
  const admin = await AdminService.findAdmin({ name, password })
  ctx.session.admin = admin
  if (admin) {
    ctx.body = admin
  } else {
    ctx.status = 401
    ctx.body = {
      message: '管理员账号密码错误'
    }
  }
}

export default {
  queryAdmin, addDefaultAdmin, login
}
