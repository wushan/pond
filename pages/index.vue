<template lang="pug">
  #home
    .container
      .waterfall
        transition-group(name="transform", tag="div", mode="out-in")
          lazy-component.pin(v-for="record of getRecordCache", :key="record.sid", @show="handler(record.sid)")
            previewCard(:source="record", :id="record.sid")
</template>

<script>
import previewCard from '~/components/previewCard'
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
      getRecordCache: 'db/getRecordCache',
      getConfig: 'app/getConfig'
    })
  },
  watch: {},
  mounted () {},
  methods: {
    handler (sid) {
      console.log(sid)
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
