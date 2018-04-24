'use strict'

import crypto from 'crypto'

const isValidPassword = password => {
  return password && password.length >= 6
}

const md5 = text => {
  return crypto
    .createHash('md5')
    .update(text)
    .digest('hex')
}

export default {
  md5: md5,
  isValidPassword: isValidPassword
}
