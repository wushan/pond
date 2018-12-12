<template lang="pug">
  #importerWrapper
    .area
      input.input(type="text", placeholder="Paste url here", v-model="inputUrl", @input="fetchContent")
    .area(v-if="inputUrl")
      button.button(@click="add")
        span.icon
          i.fa.fa-plus-square-o
    .area(v-if="inputUrl")
      button.button.is-danger(@click="discard")
        span.icon
          i.fa.fa-trash-o
    .area(v-if="isLoading")
      span.icon
        i.fa.fa-spinner.fa-pulse
</template>

<script>
import Database from '~/assets/utils/db'
import { mapGetters } from 'vuex'
let db = {}
export default {
  data () {
    return {
      inputUrl: '',
      fetchedData: null
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'app/isLoading',
      previewContent: 'app/getPreviewContent'
    })
  },
  mounted () {
    db = new Database('pounds', 'fish', 3)
  },
  methods: {
    fetchContent () {
      this.$store.commit('app/setIsLoading', true)
      this.$axios.post('/api/fetchContent', {url: this.inputUrl}).then((res) => {
        this.$store.commit('app/setIsLoading', false)
        this.$store.commit('app/setPreviewContent', res.data)
      }).catch((err) => {
        this.$store.commit('app/setIsLoading', false)
        console.log(err)
      })
    },
    add () {
      if (!this.previewContent) {
        return
      } else {
        db.insert('tony@simbo.com.tw', 'default', this.previewContent).then((result) => {
          this.$store.commit('app/setRecordCache', [result])
          this.$store.commit('app/setPreviewContent', null)
        })
      }
    },
    discard () {
      this.inputUrl = ''
      this.$store.commit('app/setPreviewContent', null)
    }
  }
}
</script>

<style lang="scss">
#importerWrapper {
  display: flex;
  .area {
    padding: 0 0.25em;
    display: flex;
    align-items: center;
  }
}
</style>
