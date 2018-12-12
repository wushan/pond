import moment from 'moment'
import short from 'short-uuid'
export default class Database {
  constructor(database, table, version) {
    this.name = database
    this.objectStoreName = table
    this.version = version
    this.db = {}
  }
  init() {
    return new Promise((resolve, reject) => {
      var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
      var request = indexedDB.open(this.name, this.version)
      request.onsuccess = (evt) => {
        // 將db暫存起來供以後操作
        this.db = request.result
        resolve()
      }

      request.onerror = (evt) => {
        console.log('IndexedDB error: ' + evt.target.errorCode)
        reject(evt.target.errorCode)
      }

      request.onupgradeneeded = (evt) => {
        var objectStore = {}
        if (evt.oldVersion < 1) {
          this.createDB(evt, objectStore)
        } else {
          // 清除 DB 重建
          evt.currentTarget.result.deleteObjectStore(this.objectStoreName)
          this.createDB(evt, objectStore)
        }
      }
    })
  }
  createDB (evt, objectStore) {
    objectStore = evt.currentTarget.result.createObjectStore(this.objectStoreName, {
      // 主 KEY
      keyPath: 'sid', autoIncrement: false, unique: true
    })
    objectStore.createIndex('sid', 'sid', { unique: true })
    objectStore.createIndex('category', 'category', { unique: false })
    objectStore.createIndex('username', 'username', { unique: false })
    objectStore.createIndex('data', 'data', { unique: false })
    objectStore.createIndex('sync', 'sync', { unique: false })
    objectStore.createIndex('indexed', 'indexed', { unique: false })
    objectStore.createIndex('created', 'created', { unique: false })
  }
  insert(username, category, data) {
    return new Promise((resolve, reject) => {
      this.init().then(() => {
        // 利用 this.db 取得 db 連線
        var transaction = this.db.transaction(this.objectStoreName, 'readwrite')
        var objectStore = transaction.objectStore(this.objectStoreName)
        let record = {
          sid: short.uuid(),
          category: category,
          username: username,
          data: data,
          sync: 0,
          indexed: 0,
          created: moment().format('x')
        }
        var request = objectStore.add(record)
        request.onsuccess = function (evt) {
          resolve(record)
        }
        request.onerror = function (evt) {
          reject(evt)
        }
      }).catch((err) => {
        console.log(err)
      })
    })
  }
  update(records) {
    return new Promise((resolve, reject) => {
      let requests = []
      records.forEach((val, index) => {
        requests.push(this.put(val))
      })
      Promise.all(requests).then((res) => {
        resolve(requests.length)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  put(record) {
    return new Promise((resolve, reject) => {
      this.init().then(() => {
        // 利用 this.db 取得 db 連線
        var transaction = this.db.transaction(this.objectStoreName, 'readwrite')
        var objectStore = transaction.objectStore(this.objectStoreName)
        var request = objectStore.put(record)
        request.onsuccess = function (evt) {
          resolve()
        }
        request.onerror = function (evt) {
          reject(evt)
        }
      })
    })
  }
  getAll () {
    return new Promise((resolve, reject) => {
      // if (limit === undefined) {
      //   limit = 5
      // }
      this.init().then(() => {
        var transaction = this.db.transaction(this.objectStoreName, 'readwrite')
        var objectStore = transaction.objectStore(this.objectStoreName)
        // objectStore = objectStore.index('time')
        var request = objectStore.getAll()
        request.onsuccess = function (evt) {
          let result = evt.target.result.sort((a, b) => {
            return a.created - b.created
          })
          resolve(result)
        }
      })
    })
  }
  get(from, to, limit) {
    return new Promise((resolve, reject) => {
      if (limit === undefined) {
        limit = 5
      }
      this.init().then(() => {
        var transaction = this.db.transaction(this.objectStoreName, 'readwrite')
        var objectStore = transaction.objectStore(this.objectStoreName)
        objectStore = objectStore.index('time')
        var request = objectStore.openCursor(IDBKeyRange.bound(from, to), IDBCursor.NEXT)
        let results = []
        request.onsuccess = function (evt) {
          var cursor = evt.target.result
          if (cursor && results.length < limit) {
            if (cursor.value.uploaded !== 'true') {
              results.push(cursor.value)
            }
            cursor.continue()
          } else {
            resolve(results)
          }
        }
      })
    })
  }
}
