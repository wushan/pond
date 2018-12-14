<template lang="pug">
  #home
    .container
      transition-group.columns.is-mobile.is-multiline.is-variable.is-2(name="transform", tag="div")
        .column.is-6-mobile.is-4-tablet.is-2-desktop(v-for="record of getRecordCache", :key="record.sid")
          previewCard(:source="record.data")
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
.restrict-tiny {
  max-width: 320px;
  margin: auto;
}
.container {
  // margin-bottom: 1em;
}
.image {
  height: 0;
  overflow: hidden;
  padding-top: 56.25%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
.title {
  word-break: break-all;
}
.card-image {
  background-color: #f7f7f7;
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
</style>
