<template lang="pug">
  #importerWrapper
    button.button.importerTrigger(@click="trigger", :class="{active: !expand}")
      span.icon
        i.fa.fa-plus-square-o
    .importerInner(:class="{active: expand}")
      .area
        input.input(type="text", placeholder="Paste url here", v-model="inputUrl", @input="fetchContent")
      .area(v-if="inputUrl")
        button.button.warning(@click="discard")
          span.icon
            i.fa.fa-trash-o
      .area(v-if="inputUrl && isValid")
        button.button(@click="add")
          span.icon
            i.fa.fa-plus-square-o
      .area(v-if="isLoading")
        span.icon
          i.fa.fa-spinner.fa-pulse
      .area
        button.button.importerTrigger(@click="trigger", :class="{active: expand && !inputUrl}")
          span.icon
            i.fa.fa-times
</template>

<script>
import Database from '~/assets/utils/db'
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'
let db = {}
export default {
  data () {
    return {
      inputUrl: '',
      fetchedData: null,
      expand: false,
      isValid: false
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'app/isLoading',
      previewContent: 'app/getPreviewContent'
    })
  },
  mounted () {
    db = new Database('pounds', 'fish', 4)
  },
  methods: {
    trigger () {
      this.expand = !this.expand
    },
    fetchContent: debounce (function () {
      this.fetch()
    }, 300),
    fetch () {
      let pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      if (pattern.test(this.inputUrl)) {
        this.$store.commit('app/setIsLoading', true)
        this.$axios.post('/api/records/resolve', {url: this.inputUrl}).then((res) => {
          this.$store.commit('app/setIsLoading', false)
          this.$store.commit('app/setPreviewContent', res.data)
          this.isValid = true
        }).catch((err) => {
          this.$store.commit('app/setIsLoading', false)
          this.$store.commit('app/setPreviewContent', null)
          this.isValid = false
          console.log(err.message)
        })
      } else {
        console.log('invalid')
        this.$store.commit('app/setIsLoading', false)
        this.$store.commit('app/setPreviewContent', null)
      }
    },
    add () {
      if (!this.previewContent) {
        return
      } else {
        db.insert(this.$auth.user.email, ['default'], this.previewContent).then((result) => {
          this.$store.commit('app/setRecordCache', [result])
          this.$store.commit('app/setPreviewContent', null)
          this.inputUrl = ''
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
  .importerTrigger {
    display: none;
    &.active {
      display: block;
    }
  }
  .importerInner {
    display: none;
    &.active {
      display: flex;
    }
    .area {
      padding: 0 0.25em;
      display: flex;
      align-items: center;
    }
  }
}
</style>
