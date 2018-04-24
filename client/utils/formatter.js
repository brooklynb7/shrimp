'use strict'

import moment from 'moment'

const getProvider = (value) => {
  let rst = value
  switch (value) {
    case 'wechat':
      rst = '微信'
      break
    case 'local':
      rst = '后台'
      break
    default:
      break
  }
  return rst
}

const getDateFormat = val => {
  return moment(val).format('YYYY-MM-DD HH:mm:ss')
}

const getWholeWeekdays = () => {
  const startDay = moment().startOf('isoWeek')
  const weekdays = [startDay.format('YYYY-MM-DD')]
  for (let i = 1; i < 5; i++) {
    weekdays.push(startDay.add(1, 'days').format('YYYY-MM-DD'))
  }
  return weekdays
}

const getWeekdayText = (date) => {
  const list = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const d = moment(date)
  return list[d.weekday()]
}

const getRoleText = (item) => {
  let text = []
  if (item.isAdmin) {
    text.push('管理员')
  }

  return text.join(',')
}

export default {
  getProvider,
  getWholeWeekdays,
  getWeekdayText,
  getRoleText,
  getDateFormat
}
