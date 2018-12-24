
export const state = () => ({
  config: {
    syncTime: 5000
  },
  neverLogin: false
})

export const mutations = {
  setNeverLogin (state, data) {
    state.neverLogin = data
  }
}

export const actions = {}
export const getters = {
  getNeverLogin (state) {
    return state.neverLogin
  },
  getConfig (state) {
    return state.config
  }
}