// import Cookie from 'js-cookie'
export const state = () => ({})
export const mutations = {}
export const actions = {
  async nuxtServerInit({ dispatch, commit, route }, { req, store, redirect }) {
    if (req.cookies.access_token && req.cookies.userId) {
      this.$axios.setToken(req.cookies.access_token)
      await dispatch('user/verifyUser', req.cookies.userId).then((data) => {
        commit('user/setUser', data)
        commit('user/setLoginStatus', true)
        redirect('/' + store.getters['user/getTeam'])
      }).catch((err) => {
        commit('user/setUser', null)
        commit('user/setLoginStatus', false)
        redirect('/')
      })
    } else {
      redirect('/')
    }
  }
}
