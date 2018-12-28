
export const state = () => ({
  config: {
    syncTime: 5000,
    perPage: 50
  },
  globalRecordCache: [],
  globalRecordCount: 0,
  neverLogin: false,
  bulkImport: false
})

export const mutations = {
  setNeverLogin (state, data) {
    state.neverLogin = data
  },
  setGlobalRecordCache (state, data) {
    state.globalRecordCache = data
  },
  setGlobalRecordCount (state, data) {
    state.globalRecordCount = data
  },
  setBulkImport (state) {
    state.bulkImport = !state.bulkImport
  }
}

export const actions = {
  async fetchGlobalRecordCache({state, commit}, pageNum) {
    const {data} = await this.$axios.get('/api/records?filter={\"limit\": \"' + state.config.perPage + '\", \"skip\": \"0\"}')
    commit('setGlobalRecordCache', data)
  },
  async fetchGlobalRecordCount({state, commit}) {
    const { data } = await this.$axios.get('/api/records/count')
    commit('setGlobalRecordCount', data.count)
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
  },
  getGlobalRecordCount (state) {
    return state.globalRecordCount
  },
  getBulkImport (state) {
    return state.bulkImport
  }
}