import Database from '~/assets/utils/db'
import { resolve } from 'path';
import { rejects } from 'assert';
let db = {}
if (process.browser) {
  db = new Database('pounds', 'fish', 4)
}
export const state = () => ({
  config: {
    syncTime: 5000
  },
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
  putRecordCache (state, data) {
    state.recordCache.forEach((record, index) => {
      if (record.sid === data.sid) {
        state.recordCache.splice(index, 1, data)
        console.log('put')
      }
    })
  },
  resetRecordCache(state, data) {
    state.recordCache = state.recordCache.slice(0, 0)
  }
}

export const actions = {
  insert ({commit}, data) {
    db.insert(this.$auth.user.email, ['default'], data).then((result) => {
      commit('setRecordCache', [result])
    })
  },
  updateRecordCache({commit}, data) {
    return new Promise((resolve, reject) => {
      commit('putRecordCache', data)
      db.put(data).then((res) => {
        resolve()
      }).catch((err) => {
        reject()
      })
    })
  }
}
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
  },
  getConfig (state) {
    return state.config
  }
}