import Database from '~/assets/utils/db'
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
  setSearchText(state, data) {
    state.searchText = data
  },
  setNeverLogin(state, data) {
    state.neverLogin = data
  },
  setIsLoading(state, data) {
    state.isLoading = data
  },
  setPreviewContent(state, data) {
    state.previewContent = data
  },
  setRecordCache(state, data) {
    for (let record of data) {
      state.recordCache.unshift(record)
    }
  },
  putRecordCache(state, data) {
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
  async feedStore ({commit}, data) {
    commit('resetRecordCache')
    await db.getAll().then((res) => {
      commit('setRecordCache', res)
    })
  },
  async syncRecords ({commit, dispatch, rootGetters}, data) {
    await db.getByQuery({
      index: 'sync',
      sync: 0
    }).then((records) => {
      if (records.length > 0) {
        this.$axios.post('/api/records/sync', records).then((res) => {
          // 同步成功後把這幾筆改成 synced
          let updatedRecords = records.map((a, b) => {
            a.sync = 1
            return a
          })
          db.update(updatedRecords).then((res) => {
            // 與 Store 同步
            for (let item of records) {
              commit('putRecordCache', item)
            }
            setTimeout(() => {
              dispatch('syncRecords')
            }, rootGetters['app/getConfig'].syncTime);
          })
        }).catch((err) => {
          console.log(err)
          setTimeout(() => {
            dispatch('syncRecords')
          }, rootGetters['app/getConfig'].syncTime);
        })
      } else {
        setTimeout(() => {
          dispatch('syncRecords')
        }, rootGetters['app/getConfig'].syncTime);
      }
    })
  },
  async insert({ commit }, data) {
    await db.insert(data.username, data.category, data.data).then((result) => {
      commit('setRecordCache', [result])
      commit('setPreviewContent', null)
    })
  },
  async resolve({commit}, data) {
    let pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    if (pattern.test(data)) {
      commit('setIsLoading', true)
      await this.$axios.post('/api/records/resolve', { url: data }).then((res) => {
        commit('setIsLoading', false)
        commit('setPreviewContent', res.data)
      }).catch((err) => {
        commit('setIsLoading', false)
        commit('setPreviewContent', null)
        console.log(err.message)
      })
    } else {
      console.log('invalid')
      commit('setIsLoading', false)
      commit('setPreviewContent', null)
    }
  },
  // async searchRecords ({commit}, text) {
  //   await db.search(state.searchText).then((res) => {
  //     commit('resetRecordCache')
  //     commit('setRecordCache', res)
  //   })
  // },
  async updateRecordCache({ commit }, data) {
    commit('putRecordCache', data)
    await db.put(data)
  }
}
export const getters = {
  getSearchText(state) {
    return state.searchText
  },
  isLoading(state) {
    return state.isLoading
  },
  getPreviewContent(state) {
    return state.previewContent
  },
  getRecordCache(state) {
    if (state.searchText !== '') {
      return state.recordCache.slice().filter(record => (record.data || {}).keywords.join().toLowerCase().includes(state.searchText) || ((record.data || {}).title || '').toLowerCase().includes(state.searchText))
    } else {
      return state.recordCache.slice().filter(record => record.deleted === 0)
    }
  }
}