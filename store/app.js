
export const state = () => ({
  config: {
    syncTime: 5000,
    perPage: 2
  },
  globalRecordCache: [],
  neverLogin: false
})

export const mutations = {
  setNeverLogin (state, data) {
    state.neverLogin = data
  },
  setGlobalRecordCache (state, data) {
    state.globalRecordCache = data
  }
}

export const actions = {
  async fetchGlobalRecordCache({state, commit}, pageNum) {
    const {data} = await this.$axios.get('/api/records?filter={\"limit\": \"' + state.config.perPage + '\", \"skip\": \"2\"}')
    commit('setGlobalRecordCache', data)
  }
}
export const getters = {
  getNeverLogin (state) {
    return state.neverLogin
  },
  getConfig (state) {
    return state.config
  },
  getGlobalRecordCache (state) {
    return state.globalRecordCache
  }
}