<template lang="pug">
  #home
    .container
      .waterfall
        transition-group(name="transform", tag="div", mode="out-in")
          lazy-component.pin(v-for="record of getGlobalRecordCache", :key="record.sid", @show="handler(record.sid)")
            previewCard(:source="record", :id="record.sid")
</template>

<script>
import previewCard from '~/components/previewCard'
// import grid from '~/components/grid'
import { mapGetters } from 'vuex'
export default {
  components: {
    previewCard
  },
  data () {
    return {
      inputUrl: ''
    }
  },
  computed: {
    ...mapGetters({
      getGlobalRecordCache: 'app/getGlobalRecordCache',
      getConfig: 'app/getConfig'
    })
  },
  watch: {},
  mounted () {
    this.$store.dispatch('app/fetchGlobalRecordCount')
    this.$store.dispatch('app/fetchGlobalRecordCache')
  },
  methods: {
    handler (sid) {
      // console.log(sid)
    },
    accessBookMarks () {
      console.log(bookmarks)
    }
  }
}
</script>

<style lang="scss">
.title {
  word-break: break-all;
}
.logo {
  img {
    max-width: 120px;
    display: block;
    margin: auto;
  }
}
</style>
