<template lang="pug">
  #importerWrapper
    transition(name="fade", mode="out-in")
      button.button.importerTrigger(v-if="!expand", @click="trigger", :class="{active: !expand}")
        span.icon
          i.fa.fa-plus
      .importerInner(v-else, :class="{active: expand}")
        .area
          .text-button(@click="toggleBulkImport")
            i.fa.fa-tasks
            span Bulk
        .area
          input.input(type="text", placeholder="Paste url here", v-model="inputUrl", @input="fetchContent", :class="{error: !isValid}")
        .area
          button.button(@click="discard", v-if="inputUrl")
            span.icon
              i.fa.fa-trash
        
          button.button(@click="add", v-if="inputUrl && isValid")
            span.icon
              i.fa.fa-plus
          span.icon(v-if="isLoading")
            i.fa.fa-spinner.fa-pulse
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
      isValid: false,
      error: null
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'db/isLoading',
      previewContent: 'db/getPreviewContent',
      isLoggedIn: 'user/isLoggedIn',
      profile: 'user/profile',
      getUserId: 'user/getUserId',
      getTeamSlug: 'user/getTeamSlug'
    })
  },
  mounted () {},
  methods: {
    toggleBulkImport () {
      this.$store.commit('app/setBulkImport')
    },
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
          username: this.profile.emails[0].value,
          data: this.previewContent,
          deleted: 0,
          sync: 0,
          indexed: 0,
          created: moment().format('x'),
          public: 1,
          userid: this.getUserId,
          teamid: this.getTeamSlug
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
@import '~assets/styles/lib/var';
@import '~breakpoint-sass/stylesheets/_breakpoint';
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
      padding: 0.5em 1em;
      display: flex;
      position: fixed;
      left: 0;
      right: 0;
      top: 63px;
      background-color: $smokygray;
      border-top: 1px solid $smokygray;
      box-shadow: 0 1px 1px rgba($black, .1);
    }
    .area {
      padding: 0 0.25em;
      display: flex;
      align-items: center;
      &:nth-child(2) {
        flex: 1;
      }
    }
  }
}
</style>
