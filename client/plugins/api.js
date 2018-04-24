'use strict'

const apiFactory = axios => ({
  /* Auth API */
  login ({ username, password }) {
    return axios.$post('/api/auth/login', { username, password })
  },
  loginAdmin ({ username, password }) {
    return axios.$post('/api/auth/loginAdmin', { username, password })
  },

  /* Weixin API */
  getWechatJsConfig (url) {
    return axios.$get(`/api/weixin/jsconfig?url=${url}`)
  },
  retrieveWxImgs (mediaIds) {
    return axios.$post(`/api/weixin/retrieveimgs`, {
      mediaIds: mediaIds.join(',')
    })
  },

  /* Me API */
  getMyPhotos () {
    return axios.$get(`/api/me/photos`)
  },

  /* User API */
  getUsers () {
    return axios.$get(`/api/users`)
  },
  updateUserIsAdmin ({ id, isAdmin }) {
    return axios.$put(`/api/users/${id}/isadmin`, { isAdmin })
  },
  removeUser (id) {
    return axios.$delete(`/api/users/${id}`)
  },

  // Feedback API
  addFeedback ({ type, detail }) {
    return axios.$post(`/api/feedbacks`, { type, detail })
  },
  getMyFeedbacks () {
    return axios.$get(`/api/feedbacks/mine`)
  },
  getFeedbacks () {
    return axios.$get(`/api/feedbacks`)
  }
})

/*
** Executed by ~/.nuxt/index.js with context given
** This method can be asynchronous
*/
export default ({ $axios }, inject) => {
  // Inject `api` key
  // -> app.$api
  // -> this.$api in vue components
  // -> this.$api in store actions/mutations
  const api = apiFactory($axios)
  inject('api', api)
}
