'use strict'

/**
 * Module dependencies.
 */

const queryEntryList = async (options) => {
  const queryObj = options.query || {}
  const Entry = options.entry
  const page = parseInt(options.page, 10) || 0
  const pageSize = parseInt(options.pageSize, 10) || 0
  const sort = options.sort || ''
  const select = options.select || ''
  const deepPopulate = options.deepPopulate || ''

  const rst = await Promise.all([
    Entry.count(queryObj),
    Entry.find(queryObj)
      .select(select)
      .deepPopulate(deepPopulate)
      .skip(page * pageSize).limit(pageSize)
      .sort(sort)
      .exec()])

  return {
    count: rst[0],
    results: rst[1]
  }
}

export default {
  queryEntryList
}
