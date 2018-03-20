export const state = () => ({
  user: null,
  isAuthenticated: false
})

export const mutations = {
  setUser (state, user) {
    state.user = user || null
  },
  setAuthenticated (state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    console.log(req.state.user)
    if (req.state.user) {
      commit('setUser', req.state.user)
      commit('setAuthenticated', true)
    } else {
      commit('setUser', null)
      commit('setAuthenticated', false)
    }
  },
  async login ({ commit }, { username, password }) {
    try {
      const user = await this.$axios.$post('/auth/login', { username, password })
      commit('setUser', user)
      commit('setAuthenticated', true)
    } catch (error) {
      commit('setUser', null)
      commit('setAuthenticated', false)
      throw error.response.data.message
    }
  },

  async logout ({ commit }) {
    // await axios.post('/api/logout')
    commit('setUser', null)
    commit('setAuthenticated', false)
  }

}
