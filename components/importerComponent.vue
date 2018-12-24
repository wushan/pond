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
import moment from 'moment'
import short from 'short-uuid'
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
      isLoading: 'db/isLoading',
      previewContent: 'db/getPreviewContent'
    })
  },
  mounted () {},
  methods: {
    trigger () {
      this.expand = !this.expand
    },
    fetchContent: debounce (function () {
      this.fetch()
    }, 300),
    fetch () {
      this.$store.dispatch('db/resolve', this.inputUrl).then((res) => {
        this.isValid = true
      }).catch((err) => {
        this.isValid = false
      })
    },
    add () {
      if (!this.previewContent) {
        return
      } else {
        let record = {
          sid: short.uuid(),
          category: ['default'],
          username: this.$auth.user.email,
          data: this.previewContent,
          deleted: 0,
          sync: 0,
          indexed: 0,
          created: moment().format('x'),
          public: 1
        }
        this.$store.dispatch('db/insert', record).then((result) => {
          this.inputUrl = ''
        })
      }
    },
    discard () {
      this.inputUrl = ''
      this.$store.commit('db/setPreviewContent', null)
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
