import Cookies from 'js-cookie'
export const state = () => ({
  user: null,
  teamInfo: null,
  isLoggedIn: false
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  setLoginStatus (state, data) {
    state.isLoggedIn = data
  },
  setTeamInfo (state, data) {
    state.teamInfo = data
  }
}

export const actions = {
  async fetchTeamInfo({ commit, getters}, data) {
    let teamInfo = await this.$axios.get('/api/Teams/' + getters.getTeamSlug)
    commit('setTeamInfo', teamInfo.data)
    return teamInfo
  },
  async verifyUser({ commit, getters }, id) {
    let { data } = await this.$axios.get('/api/UserIdentities/' + id + '?filter={\"include\": \"user\"}')
    return data
    // try {
    //   const { data } = await this.$axios.get('/api/UserIdentities/' + id + '?filter={\"include\": \"user\"}')
    //   commit('setUser', data)
    //   commit('setLoginStatus', true)
    //   return data
    // } catch (err) {
    //   return err
    //   commit('setUser', null)
    //   commit('setLoginStatus', false)
    // }
  },
  async logout() {
    await this.$axios.post('/api/Users/logout')
  }
}
export const getters = {
  profile (state) {
    return state.user.profile
  },
  email(state, getters) {
    return getters.profile.emails[0].value
  },
  isLoggedIn (state) {
    return state.isLoggedIn
  },
  getToken (state) {
    return Cookies.get('access_token')
  },
  getTeamSlug (state) {
    return ((state.user || {}).user || {}).teamId
    // return state.user.user.teamId.split('')[0].toUpperCase() + state.user.user.teamId.split('').slice(1).join('')
  },
  getTeam (state, getters) {
    return {
      name: (state.teamInfo || {}).name,
      description: (state.teamInfo || {}).description,
      slug: (state.teamInfo || {}).slug
    }
  },
  getUserId (state) {
    return (state.user || {}).userId
  }
}