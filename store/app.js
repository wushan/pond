export const state = () => ({
  recordCache: [],
  previewContent: null,
  isLoading: false
})

export const mutations = {
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
  }
}