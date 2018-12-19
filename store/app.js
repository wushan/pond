export const state = () => ({
  recordCache: [],
  previewContent: null,
  isLoading: false,
  neverLogin: false,
  searchText: ''
})

export const mutations = {
  setSearchText (state, data) {
    state.searchText = data
  },
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
  getSearchText (state) {
    return state.searchText
  },
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