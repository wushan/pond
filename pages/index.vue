<template lang="pug">
  #home
    .container
      .waterfall
        //- transition-group.columns.is-mobile.is-multiline.is-variable.is-2(name="transform", tag="div", mode="out-in")
        .pin(v-for="record of getRecordCache", :key="record.sid")
          previewCard(:source="record.data", :id="record.sid")
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
      getRecordCache: 'app/getRecordCache'
    })
  },
  watch: {
    getRecordCache () {
      console.log('cacheChanged')
    }
  },
  mounted () {
    db = new Database('pounds', 'fish', 3)
    this.fecthHistory()
  },
  methods: {
    accessBookMarks () {
      console.log(bookmarks)
    },
    fecthHistory () {
      // db.getRange()
      this.$store.commit('app/resetRecordCache')
      db.getAll().then((res) => {
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
    padding: 0.5em 0;
    margin: 0 0.125em 1em;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
  }
}
</style>
