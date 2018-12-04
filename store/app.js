export const state = () => ({
  recordCache: []
})

export const mutations = {
  setRecordCache (state, data) {
    state.recordCache = data
  }
}

export const actions = {}
export const getters = {
  getRecordCache (state) {
    return state.recordCache
  }
}