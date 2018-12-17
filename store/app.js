export const state = () => ({
  recordCache: [],
  previewContent: null,
  isLoading: false,
  neverLogin: false
})

export const mutations = {
  setNeverLogin (state, data) {
    state.neverLogin = data
  },
  setIsLoading (state, data) {
    state.isLoading = data
  },
  setPreviewContent (state, data) {
    state.previewContent = data
  },
  setRecordCache (state, data) {
    for (let record of data) {
      state.recordCache.unshift(record)
    }
  },
  resetRecordCache(state, data) {
    state.recordCache = state.recordCache.slice(0, 0)
  }
}

export const actions = {}
export const getters = {
  isLoading (state) {
    return state.isLoading
  },
  getPreviewContent (state) {
    return state.previewContent
  },
  getRecordCache (state) {
    return state.recordCache
  },
  getNeverLogin (state) {
    return state.neverLogin
  }
}