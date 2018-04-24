'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import feedbackModel from '../models/feedback'
import base from './base'

feedbackModel.init()

const Feedback = mongoose.model('Feedback')

const queryFeedback = async ({ page, pageSize, query, sort }) => {
  return base.queryEntryList({
    entry: Feedback,
    query: query,
    page: page,
    pageSize: pageSize,
    sort: sort || '-createTime',
    deepPopulate: 'user'
  })
}

const addFeedback = async (feedbackData) => {
  const feedback = new Feedback(feedbackData)
  await feedback.save()
  return feedback
}

export default {
  addFeedback, queryFeedback
}
