'use strict'

import FeedbackService from '../services/feedback'

/*
 * API Controller
 */

const addFeedback = async (ctx) => {
  try {
    const feedbackData = {
      issueType: ctx.request.body.type,
      detail: ctx.request.body.detail,
      user: ctx.state.user._id
    }

    const feedback = await FeedbackService.addFeedback(feedbackData)
    ctx.body = feedback
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
}

const getFeedbacks = async (ctx) => {
  try {
    const feedbacks = await FeedbackService.queryFeedback({})
    ctx.body = feedbacks
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
}

const getMyFeedbacks = async (ctx) => {
  try {
    const feedbacks = await FeedbackService.queryFeedback({
      query: {
        user: ctx.state.user._id
      }
    })
    ctx.body = feedbacks
  } catch (err) {
    ctx.status = 500
    ctx.body = err
  }
}

export default {
  addFeedback, getMyFeedbacks, getFeedbacks
}
