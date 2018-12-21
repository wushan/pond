<template lang="pug">
  #home
    .container
      .waterfall
        transition-group(name="transform", tag="div", mode="out-in")
          .pin(v-for="record of getRecordCache", :key="record.sid")
            previewCard(:source="record", :id="record.sid")
</template>

<script>
import Database from '~/assets/utils/db'
import previewCard from '~/components/previewCard'
import { mapGetters } from 'vuex'
let db = {}
export default {
  components: {
    previewCard
  },
  data () {
    return {
      inputUrl: '',
      fetchedData: null
    }
  },
  computed: {
    ...mapGetters({
      getRecordCache: 'app/getRecordCache',
      getConfig: 'app/getConfig'
    })
  },
  watch: {
    getRecordCache () {
      console.log('cacheChanged')
    }
  },
  mounted () {
    db = new Database('pounds', 'fish', 4)
    this.fecthHistory().then(() => {
      if (this.$auth.loggedIn) {
        this.syncRecords()
      }
    })
  },
  methods: {
    syncRecords () {
      // 取出所有未同步的紀錄
      db.getByQuery({
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
              this.fecthHistory().then(() => {
                setTimeout(() => {
                  this.syncRecords()
                }, this.getConfig.syncTime);
              })
            })
          }).catch((err) => {
            console.log(err)
            this.fecthHistory().then(() => {
              setTimeout(() => {
                this.syncRecords()
              }, this.getConfig.syncTime);
            })
          })
        } else {
          setTimeout(() => {
            this.syncRecords()
          }, this.getConfig.syncTime);
        }
      })
    },
    accessBookMarks () {
      console.log(bookmarks)
    },
    async fecthHistory () {
      this.$store.commit('app/resetRecordCache')
      await db.getAll().then((res) => {
        this.$store.commit('app/setRecordCache', res)
      })
    }
  }
}
</script>

<style lang="scss">
.title {
  word-break: break-all;
}
h1 {
  text-align: center;
  small {
    display: block;
  }
}
.logo {
  img {
    max-width: 120px;
    display: block;
    margin: auto;
  }
}
.waterfall {
  column-count: 6;
  column-width: 18em;
  column-gap: 1em;
  transition: .3s all ease;
  .pin {
    transition: .3s all ease;
    padding: 0.2em 0;
    margin: 0 0.125em 1em;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
  }
}
</style>
