'use strict'

import FeedbackService from '../services/feedback'

/*
 * API Controller
 */

const addFeedback = async (ctx) => {
  const feedbackData = {
    issueType: ctx.request.body.type,
    detail: ctx.request.body.detail,
    user: ctx.state.user._id
  }

  const feedback = await FeedbackService.addFeedback(feedbackData)
  ctx.body = feedback
}

const getFeedbacks = async (ctx) => {
  const feedbacks = await FeedbackService.queryFeedback({})
  ctx.body = feedbacks
}

const getMyFeedbacks = async (ctx) => {
  const feedbacks = await FeedbackService.queryFeedback({
    query: {
      user: ctx.state.user._id
    }
  })
  ctx.body = feedbacks
}

export default {
  addFeedback, getMyFeedbacks, getFeedbacks
}
